import argparse
from pathlib import Path
from importlib import resources, util
import shutil
from rich.console import Console
from rich.panel import Panel

APP_NAME = 'chad/ui'
BASE_DIR = Path(__file__).parent
COMPONENTS_DIR = BASE_DIR / 'components'

console=Console()

def cli() -> None:
    parser = argparse.ArgumentParser()

    subparsers = parser.add_subparsers(
        title='commands',
        description=f'The command to provide to the {APP_NAME} command-line interface'
    )

    # 'index' subcommand
    parser_index = subparsers.add_parser('index', help=f'index all available {APP_NAME} components')
    parser_index.set_defaults(func=index)

    # 'add' subcommand
    parser_add = subparsers.add_parser('add', help=f'add a component')
    parser_add.add_argument('component', nargs=1, type=str, help='name of the component to add')
    parser_add.set_defaults(func=add)

    args = parser.parse_args()
    args.func(args)


def index(args: argparse.Namespace) -> None:

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
    pass
    

