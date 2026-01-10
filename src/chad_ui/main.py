import argparse
from pathlib import Path
from importlib import resources, util
import shutil
from rich import print
from rich.console import Console
from rich.panel import Panel

APP_NAME = 'chad/ui'
BASE_DIR = Path(__file__).parent
COMPONENTS_DIR = BASE_DIR / 'components'

console=Console()

def cli() -> None:
    parser = argparse.ArgumentParser(
        description='Command-line interface to interact with the chad/ui component library',
    )

    subparsers = parser.add_subparsers(
        title='commands',
        description=f'The command to provide to the {APP_NAME} command-line interface',
    )

    # 'index' subcommand
    parser_index = subparsers.add_parser('index', help=f'index all available {APP_NAME} components')
    parser_index.set_defaults(func=index)

    # 'add' subcommand
    parser_add = subparsers.add_parser('add', help=f'add a component', formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser_add.add_argument('component', nargs=1, type=str, help='name of the component to add')
    parser_add.add_argument('-d', '--dest',type=str, default='chad-ui', help='directory (absolute or relative path) to copy assets into', metavar='DIR')
    parser_add.add_argument('-o', '--overwrite', action='store_true', help='overwrite existing files in the destination directory')
    parser_add.set_defaults(func=add)

    args = parser.parse_args()
    args.func(args)


def index(args: argparse.Namespace) -> None:
    """
    CLI command to provide an index/list of the names of all components available for add by the user.
    """
    index_paths = COMPONENTS_DIR.rglob('templates/cotton/*/index.html')
    components_native = [path.parts[-2] for path in index_paths if 'native' in path.parts]
    components_thirdparty = [path.parts[-2] for path in index_paths if 'third_party' in path.parts]

    components_native.sort()
    components_thirdparty.sort()

    msg_native = f"""
Native components:
[green]{'\n'.join(components_native)}[/green]
    """
    msg_third_party = f"""
Third-party integrations:
[green]{'\n'.join(components_thirdparty)}[/green]
    """
    msg = ""

    if len(components_native) > 0:
        msg += msg_native
    if len(components_thirdparty) > 0:
        msg += msg_third_party

    console.print(Panel(msg, title=f'{APP_NAME} components index', expand=False))

def add(args: argparse.Namespace) -> None:
    """
    CLI command to add/copy a component into the user's workspace.
    """
    arg_component = args.component[0]
    arg_dst_dir = Path(args.dest)
    arg_overwrite = args.overwrite
    
    index_match = _match_index(arg_component)
    if len(index_match) == 0:
        console.print(f"[red]ERROR: '{arg_component}' not found in component index[/red]")
        return None
    if len(index_match) > 1:
        console.print(f"[yellow]WARNING: Unexpected state - Multiple component directories found for '{arg_component}'. Please report this issue.[/yellow]")
        return None
    
    root_dir = _find_component_root_dir(index_match[0])
    if root_dir is None:
        console.print(f"[red]ERROR: Could not find root directory for '{arg_component}'[/red]")
        return None

    try:
        _copy(arg_component, root_dir, arg_dst_dir, arg_overwrite)
    except Exception as e:
        console.print(f"[red]ERROR: Copy failed - {e}[/red]")
        return None
    
def _match_index(component: str) -> list[Path]:
    """
    Match paths to the 'index.html' file for a component.
    """
    index_path = COMPONENTS_DIR.rglob(f'templates/cotton/{component}/index.html')
    return [path for path in index_path]

def _find_component_root_dir(component_index: Path) -> Path | None:
    """
    Find the root directory for a component that contains its templates and static assets.
    """
    root_dirs = ['native', 'third_party']
    for parent in component_index.parents:
        if parent.name in root_dirs:
            return parent
    return None

def _copy(component: str, src: Path, dst: Path, overwrite: bool = False):
    """
    Perform the copy of component assets from its root dir to a dst dir specified by the user.
    """
    src_templates: Path = src / 'templates' / 'cotton' / component
    src_static: Path = src / 'static' / 'js' / component
    dst_templates = Path(dst) / 'templates' / 'cotton' / component
    dst_static = Path(dst) / 'static' / 'js' / component

    files_copied = 0

    # copy templates
    dst_templates.mkdir(parents=True, exist_ok=True)
    for html_file in src_templates.glob('*.html'):
        dst_path = dst_templates / html_file.name
        if dst_path.exists() and not overwrite:
            console.print(f"[dim]x Skipped '{dst_path}' (already exists)[/dim]")
        else:
            shutil.copy(html_file, dst_templates / html_file.name)
            console.print(f"[green]✓ Added '{dst_templates / html_file.name}'")
            files_copied += 1

    if src_static.exists():
        # copy static assets
        dst_static.mkdir(parents=True, exist_ok=True)
        for js_file in src_static.glob('*.js'):
            dst_path = dst_static / js_file.name
            if dst_path.exists() and not overwrite:
                console.print(f"[dim]x Skipped '{dst_path}' (already exists)[/dim]")
            else:
                shutil.copy(js_file, dst_static / js_file.name)
                console.print(f"[green]✓ Added '{dst_static / js_file.name}'")
                files_copied += 1

    if files_copied > 0:
        console.print(f"[bold green]Component '{component}' successfully installed.[/bold green]")