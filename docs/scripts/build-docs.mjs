import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkDirective from 'remark-directive'
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join, basename, dirname } from 'path';
import { visit } from 'unist-util-visit';

const INPUT_DIR = './markdown';
const CONFIG_DIR = './scripts/config';
const OUTPUT_DIR_JSON = './static/docs';
const OUTPUT_DIR_TEMPLATES = './templates/docs';

const COMPONENT_PREVIEW_CODE_HIDDEN_LINES = 3;
const TAG_DEFAULT_CLASS_MAPPING = {
	p:    'leading-relaxed [&:not(:first-child)]:mt-6',
	code:   'relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] break-words outline-none',
	h2:   '[&+]*:[code]:text-xl mt-10 scroll-m-28 font-heading text-xl font-medium tracking-tight first:mt-0 lg:mt-12 [&+.steps]:mt-0! [&+.steps>h3]:mt-4! [&+h3]:mt-6! [&+p]:mt-4!',
	h3:   'mt-12 scroll-m-28 font-heading text-lg font-medium tracking-tight [&+p]:mt-4! *:[code]:text-xl',
	pre:  'no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent',
	figure: '[&_pre]:max-h-96',
	table:  'relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0',
	thead:  '',
	tbody:  '',
	tr:   'm-0 border-b',
	th:   'px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
	td:   'px-4 py-2 text-left whitespace-nowrap [&[align=center]]:text-center [&[align=right]]:text-right',
};

const PRETTY_CODE_OPTIONS = {
	theme: { dark: 'github-dark', light: 'github-light' },
	keepBackground: true,
};

function processElementParagraph(node, index, parent) {
	if (node.tagName !== 'p') return;
	processElementCodeInline(node);
	node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
}

function processElementHeader(node, index, parent) {
	if (!['h2', 'h3'].includes(node.tagName)) return;
	node.properties.id = node.children.find((c) => c.type === 'text')?.value;
	node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
}

function processElementTr(node, index, parent) {
	if (node.tagName !== 'tr') return;
	node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
}

function processElementTh(node, index, parent) {
	if (node.tagName !== 'th') return;
	node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
}

function processElementTd(node, index, parent) {
	if (node.tagName !== 'td') return;
	node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
}

function processElementTableHeadBody(node, index, parent) {
	if (!['thead', 'tbody'].includes(node.tagName)) return;
	node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
}

function processElementTable(node, index, parent) {
	if (node.tagName !== 'table') return;
	node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
	parent.children[index] = {
		type: 'element',
		tagName: 'div',
		properties: { className: ['my-6 no-scrollbar w-full overflow-y-auto rounded-xl border'] },
		children: [node],
	};
}

function processElementCodeInline(node, index, parent) {
	node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
}

function processElementCodeBlock(node, index, parent) {
	if (node.tagName !== 'code') return;
}

function processElementCode(node, index, parent) {
	if (parent.tagName === 'pre') processElementCodeBlock(node, index, parent)
	else processElementCodeInline(node)
}

function processElementPre(node, index, parent) {
	if (node.tagName !== 'pre') return;
	node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
	if (parent?.tagName === 'c-tabs.content') node.properties.className += ' pt-9!';
}

function processElementFigure(node, index, parent) {
	if (node.tagName !== 'figure') return;
	if (parent) node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
}

function rehypeDocsTree(options) {
	const MAPPING_NODE_FUNC = {
		figure: processElementFigure,
		pre:  processElementPre,
		code:   processElementCode,
		h2:   processElementHeader,
		h3:   processElementHeader,
		p:    processElementParagraph,
		table:  processElementTable,
		thead:  processElementTableHeadBody,
		tbody:  processElementTableHeadBody,
		tr:   processElementTr,
		th:   processElementTh,
		td:   processElementTd,
	};
	const executeTags = Object.keys(MAPPING_NODE_FUNC).filter(tag =>
		(!options?.include || options.include.includes(tag)) &&
		(!options?.exclude || !options.exclude.includes(tag))
	)
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (executeTags.includes(node.tagName)) MAPPING_NODE_FUNC[node.tagName]?.(node, index, parent);
		});
	};
}

function rehypeExampleCodeOverlay() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (node.tagName !== 'code') return;
			node.children
				.filter((c) => c.type === 'element' && c.tagName === 'span')
				.slice(COMPONENT_PREVIEW_CODE_HIDDEN_LINES)
				.forEach((c) => {
					c.properties = { ...c.properties, 'x-show': 'open' };
				});
		});
	};
}

function rehypeExampleStructure() {
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName !== 'c-tabs') return;

			const firstContent = node.children.find((c) => c.tagName === 'c-tabs.content');
			const firstFigure = firstContent?.children?.find((c) => c.type === 'element' && c.tagName === 'figure');
			const figureProperties = { ...firstFigure?.properties };

			node.children = node.children.map((child) => {
				if (child.tagName !== 'c-tabs.content') return child;
				child.children = child.children.flatMap((c) => {
					if (c.type === 'element' && c.tagName === 'figure') {
						return c.children.filter((fc) => fc.type === 'element' && fc.tagName === 'pre');
					}
					return [c];
				});
				return child;
			});

			parent.children.splice(index, 1, {
				type: 'element',
				tagName: 'figure',
				properties: figureProperties,
				children: [node],
			});
		});
	};
}

function rehypeExampleCodeVerbatim() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (['c-tabs.content', 'figure'].includes(node.tagName)) {
				node.children = [
					{ type: 'raw', value: '{% verbatim %}' },
					...node.children,
					{ type: 'raw', value: '{% endverbatim %}' },
				];
			}
		});
	};
}

function processExampleDirective() {
	return (tree) => {
		visit(tree, (node, index, parent) => {
			if (node.type === 'containerDirective' && node.name === 'example') {
				const codeBlocks = node.children.filter((c) => c.type === 'code')
				if (codeBlocks.length === 1) {
					parent.children.splice(index, 1, ...node.children);
				} else if (codeBlocks.length > 1) {
					const tabsList = {
						type: 'element',
						tagName: 'c-tabs.list',
						properties: {
							className: 'h-9! pl-3! w-full! sticky! top-0! z-10! bg-gradient-to-b! from-code! to-transparent! justify-start!',
							variant: 'line'
						},
						children: codeBlocks.map((block) => ({
							type: 'element',
							tagName: 'c-tabs.trigger',
							properties: {
								className: 'flex-0! group-data-[orientation=horizontal]/tabs:after:invisible bg-radial! from-code from-10% to-transparent',
								value: block.lang || 'code',
							},
							children: [{
								type: 'text',
								value: block.lang || 'code',
							}],
						})),
					};
					const tabsContents = codeBlocks.map((block, i) => ({
						type: 'element',
						tagName: 'c-tabs.content',
						properties: {
							className: '-mt-9!',
							value: block.lang || `code-${i}`,
						},
						children: [{
							type: 'element',
							tagName: 'pre',
							properties: {},
							children: [{
								type: 'element',
								tagName: 'code',
								properties: {
									className: [`language-${block.lang}`],
								},
								data: { meta: block.meta },
								children: [{
									type: 'text',
									value: block.value,
								}],
							}],
						}],
					}));
					node.data = {
						hName: 'c-tabs',
						hProperties: {
							className: 'gap-0! relative! max-h-96! bg-transparent!',
							defaultValue: codeBlocks[0]?.lang || 'code-0',
						},
						hChildren: [tabsList, ...tabsContents],
					}
				}
			}
		});
	};
}

function slugify(text) {
	return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

async function processMarkdown(markdownContent, dir, name) {
	const headingRe = /^#{2,3}\s(.+)$/gm;
	const directiveRe = /:::(\w+)\s*\n([\s\S]*?):::/g;
	const combinedRe = new RegExp(`${headingRe.source}|${directiveRe.source}`, 'gm')
	const codeBlockRe = /```(\w+)\s*\n([\s\S]*?)```/g;
	const directiveMatches = []
	const codeBlockMatches = []

	let matchedHeading = null;
	let contentSansDirectivesAndBlocks = markdownContent.replace(combinedRe, (match, heading, directive, directiveContent) => {
		if (heading) {
			matchedHeading = slugify(heading);
			return match;
		}
		const placeholder = `<div data-directive="${directiveMatches.length}"></div>`;
		directiveMatches.push({ match: match.trim(), directive, directiveContent: directiveContent.trim(), heading: matchedHeading })
		return placeholder
	})

	contentSansDirectivesAndBlocks = contentSansDirectivesAndBlocks.replace(codeBlockRe, (match, lang, code) => {
		const placeholder = `<div data-codeblock="${codeBlockMatches.length}"></div>`;
		codeBlockMatches.push({ lang, code: code.trim()})
		return placeholder
	})
	
	const fileSansDirectivesAndBlocks = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeDocsTree, {
			exclude: ['figure', 'pre']
		})
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(contentSansDirectivesAndBlocks);

	let html = String(fileSansDirectivesAndBlocks);

	await Promise.all(codeBlockMatches.map(async ({ lang, code}, i) => {
		let content = `\`\`\`${lang}\n${code}\n\`\`\``;
		if (['html', 'python'].includes(lang)) {
			content = `\`\`\`${lang} showLineNumbers\n${code}\n\`\`\``;
		} 

		const fileCodeBlock = await unified()
			.use(remarkParse)
			.use(remarkDirective)
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypePrettyCode, PRETTY_CODE_OPTIONS)
			.use(rehypeDocsTree, {
				exclude: ['h2', 'h3', 'p', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
				include: ['pre', 'code']
			})
			.use(rehypeStringify, { allowDangerousHtml: true })
			.process(content);

		const block = `
			<c-code>
				{% verbatim %}
				${String(fileCodeBlock)}
				{% endverbatim %}
			</c-code>
		`;
		html = html.replace(`<div data-codeblock="${i}"></div>`, block);
	}))

	const exampleConfigsPath = join(CONFIG_DIR, dir, `${name}.json`);
	const exampleConfigs = existsSync(exampleConfigsPath)
		? JSON.parse(readFileSync(exampleConfigsPath, 'utf-8'))
		: {};
	const exampleDefaultConfig = exampleConfigs['default'];

	await Promise.all(directiveMatches.map(async ({ match, directive, directiveContent, heading }, i) => {
		const firstCodeBlockRe = /```\w+\s*\n([\s\S]*?)```/g;
		const firstCodeBlock = firstCodeBlockRe.exec(directiveContent)?.[1];
		const codeBlockOpenerRe = /^(```\w+)(?! showLineNumbers)$/gm;
		const content = match.replace(codeBlockOpenerRe, '$1 showLineNumbers');

		const fileDirective = await unified()
			.use(remarkParse)
			.use(remarkDirective)
			.use(processExampleDirective)
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypePrettyCode, PRETTY_CODE_OPTIONS)
			.use(rehypeExampleCodeVerbatim)
			.use(rehypeExampleStructure)
			.use(rehypeExampleCodeOverlay)
			.use(rehypeDocsTree, {
				exclude: ['h2', 'h3', 'p', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
				include: ['figure', 'pre', 'code']
			})
			.use(rehypeStringify, { allowDangerousHtml: true })
			.process(content);
		
		const headingName = heading ?? "example";
		const exampleAlign = exampleConfigs[headingName]?.align ?? exampleDefaultConfig?.align;
		const exampleClass = [exampleDefaultConfig?.class, exampleConfigs[headingName]?.class].filter(Boolean).join(' ');

		const block = `
			<c-example>
				<c-example.preview${exampleAlign ? ` align="${exampleAlign}"` : ''}${exampleClass ? ` class="${exampleClass}"` : ''}>
					${firstCodeBlock}
				</c-example.preview>
				<c-example.code class="[&_[data-rehype-pretty-code-figure]]:m-0! [&_[data-rehype-pretty-code-figure]]:rounded-t-none! [&_[data-rehype-pretty-code-figure]]:border-t!">
					${String(fileDirective)}
					<c-button variant="ghost" size="icon"
						@click="copyCode()"
						data-copied="false"
						data-slot="copy-button"
						class="absolute top-1.5! z-10 size-7! bg-code hover:opacity-100 focus-visible:opacity-100"
					>
						{% heroicon_outline 'square-2-stack' stroke_width=2 x_show="!copied" %}
						{% heroicon_outline 'check' stroke_width=2 x_show="copied" %}
					</c-button>
				</c-example.code>
			</c-example>
		`;
		html = html.replace(`<div data-directive="${i}"></div>`, block);
	}))
	return html
}

const files = readdirSync(INPUT_DIR, { recursive: true }).filter((f) => f.endsWith('.md'));

await Promise.all(files.map(async (file) => {
	const dir = dirname(file);
	const name = basename(file, '.md');

	const raw = readFileSync(join(INPUT_DIR, file), 'utf-8');
	const { data: frontmatter, content } = matter(raw);
	const html = await processMarkdown(content, dir, name);

	mkdirSync(join(OUTPUT_DIR_JSON, dir), { recursive: true });
	writeFileSync(join(OUTPUT_DIR_JSON, dir, `${name}.json`), JSON.stringify({ frontmatter }));

	mkdirSync(join(OUTPUT_DIR_TEMPLATES, dir, name), { recursive: true });
	writeFileSync(join(OUTPUT_DIR_TEMPLATES, dir, name, 'build.html'), html);

	console.log(`✓ ${name}`);
}));