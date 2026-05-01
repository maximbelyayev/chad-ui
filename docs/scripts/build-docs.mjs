import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkDirective from 'remark-directive'
import rehypeRaw from 'rehype-raw';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join, basename, dirname } from 'path';
import { visit, SKIP } from 'unist-util-visit';

const INPUT_DIR = './markdown';
const CONFIG_DIR = './scripts/config';
const OUTPUT_DIR_JSON = './static/docs';
const OUTPUT_DIR_TEMPLATES = './templates/docs';

const PRETTY_CODE_OPTIONS = {
	theme: { dark: 'github-dark', light: 'github-light' },
	keepBackground: true,
};
const COMPONENT_PREVIEW_CODE_HIDDEN_LINES = 3;
const TAG_DEFAULT_CLASS_MAPPING = {
	figure: '[&_pre]:max-h-96',
	pre:  	'no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent',
	code:   'relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] break-words outline-none whitespace-nowrap',
	h2:   	'[&+]*:[code]:text-xl mt-10 scroll-m-28 font-heading text-xl font-medium tracking-tight first:mt-0 lg:mt-12 [&+.steps]:mt-0! [&+.steps>h3]:mt-4! [&+h3]:mt-6! [&+p]:mt-4!',
	h3:   	'mt-12 scroll-m-28 font-heading text-lg font-medium tracking-tight [&+p]:mt-4! *:[code]:text-xl',
  h4:   	'mt-14 scroll-m-28 font-heading text-[16px] font-medium tracking-tight [&+p]:mt-4! *:[code]:text-xl',
  h5:   	'mt-14 scroll-m-28 font-heading text-md font-medium tracking-tight [&+p]:mt-4! *:[code]:text-xl',
	p:  	'leading-relaxed [&:not(:first-child)]:mt-6',
	a:		'font-medium underline underline-offset-4',
	strong: 'font-medium',
	ul: 	'my-6 ml-6 list-disc',
	li: 	'mt-2',
	table:  'relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0',
	thead:  '',
	tbody:  '',
	tr:   	'm-0 border-b',
	th:   	'px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
	td:   	'px-4 py-2 text-left whitespace-nowrap [&[align=center]]:text-center [&[align=right]]:text-right',
};


function slugify(text) {
	return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

function processElementLi(node, index, parent) {
	if (node.tagName !== 'li') return;
	processElementCodeInline(node);
	node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
}

function processElementUl(node, index, parent) {
	if (node.tagName !== 'ul') return;
	processElementCodeInline(node);
	node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
}

function processElementStrong(node, index, parent) {
	if (node.tagName !== 'strong') return;
	processElementCodeInline(node);
	node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
}

function processElementAnchor(node, index, parent) {
	if (node.tagName !== 'a') return;
	processElementCodeInline(node);
	node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
}

function processElementParagraph(node, index, parent) {
	if (node.tagName !== 'p') return;
	processElementCodeInline(node);
	node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
}

function processElementHeader(node, index, parent) {
	if (!['h2', 'h3', 'h4', 'h5'].includes(node.tagName)) return;
	node.properties.id = slugify(node.children.find((c) => c.type === 'text')?.value)
	node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
}

function processElementTd(node, index, parent) {
	if (node.tagName !== 'td') return;
	node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
}

function processElementTh(node, index, parent) {
	if (node.tagName !== 'th') return;
	node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
}

function processElementTr(node, index, parent) {
	if (node.tagName !== 'tr') return;
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

function tryProcessPropTable(node) {
	const propTableThTexts = ['Prop', 'Type', 'Default', 'Description']
  const tHead = node.children.find(c => c.type === 'element' && c.tagName === 'thead');
  const tHeadTr = tHead?.children.find(c => c.type === 'element' && c.tagName === 'tr');
  const ths = tHeadTr?.children.filter(c => c.type === 'element' && c.tagName === 'th') ?? [];
	const thTexts = ths.map((th) => th.children.find(c => c.type === 'text')?.value);
  if (thTexts.length !== propTableThTexts.length ||
		!thTexts.every((text, i) => propTableThTexts[i] === text)
	) return null
  return processElementTableAsDetails(node);
}

function processElementTableAsDetails(node) {
	const PROP_TABLE_CLASS_MAPPING = {
		containerDiv: 'my-6 no-scrollbar w-full overflow-y-auto rounded-xl border',
		tableDiv: 'relative w-full overflow-hidden text-sm',
		headerDiv: TAG_DEFAULT_CLASS_MAPPING.tr + ' grid grid-cols-[16.5fr_2.5rem] md:grid-cols-[5fr_7fr_4.5fr_2.5rem] [&>*]:hidden [&>*:first-child]:block [&>*:last-child]:block md:[&>*]:block',
		headerDivChild: TAG_DEFAULT_CLASS_MAPPING.th,
		details: 'group border-b last:border-b-0',
		detailsSummary: 'grid grid-cols-[16.5fr_2.5rem] md:grid-cols-[5fr_7fr_4.5fr_2.5rem] cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-muted/50 [&>*]:hidden [&>*:first-child]:flex [&>*:last-child]:flex md:[&>*]:flex',
		detailsSummaryChild: TAG_DEFAULT_CLASS_MAPPING.td + ' min-w-0 overflow-x-auto no-scrollbar',
		detailsSummaryChevronChild: 'flex items-center justify-center transition-transform duration-200 group-open:rotate-180',
		detailsContent: 'py-2 border-t bg-muted/20 dark:[&_code]:bg-border [&_code]:block! [&_code]:w-fit',
		detailsContentDl: 'flex flex-col gap-2',
		detailsContentDlChild: 'flex flex-col md:grid md:grid-cols-[5fr_11.5fr_2.5rem] w-full',
		detailsContentDlDt: 'px-4 py-2 font-semibold',
		detailsContentDlDd: 'px-4 py-2 [&_code]:inline-block! [&_code]:whitespace-normal'
	};
  const tHead = node.children.find(c => c.type === 'element' && c.tagName === 'thead');
  const tHeadTr = tHead?.children.find(c => c.type === 'element' && c.tagName === 'tr');
  const ths = tHeadTr?.children.filter(c => c.type === 'element' && c.tagName === 'th') ?? [];
  const tBody = node.children.find(c => c.type === 'element' && c.tagName === 'tbody');
  const tBodyTrs = tBody?.children.filter(c => c.type === 'element' && c.tagName === 'tr') ?? [];

  const makeTextNode = (value) => ({ type: 'text', value });
  const makeTd = (children) => ({
    type: 'element',
    tagName: 'td',
    properties: {},
    children,
  });
  const additionalAttrsRow = {
    type: 'element',
    tagName: 'tr',
    properties: {},
    children: [
      makeTd([makeTextNode('-')]),
      makeTd([makeTextNode('-')]),
      makeTd([makeTextNode('-')]),
      makeTd([
        makeTextNode('Any additional HTML attribute, '),
        { type: 'element', tagName: 'a', properties: { href: 'https://four.htmx.org/reference' }, children: [makeTextNode('HTMX')] },
        makeTextNode(' attribute, '),
        { type: 'element', tagName: 'a', properties: { href: 'https://alpinejs.dev/directives/data' }, children: [makeTextNode('AlpineJS')] },
        makeTextNode(' directive, or '),
        { type: 'element', tagName: 'a', properties: { href: 'https://django-cotton.com/docs/components#dynamic-attributes' }, children: [makeTextNode('django-cotton')] },
        makeTextNode(' dynamic attribute. For more details, please see the section on '),
        { type: 'element', tagName: 'a', properties: { href: '/docs/usage-patterns' }, children: [makeTextNode('Usage Patterns')] },
        makeTextNode('.'),
      ]),
    ],
  };
  tBodyTrs.push(additionalAttrsRow);

  const headerDiv = {
    type: 'element',
    tagName: 'div',
    properties: { className: PROP_TABLE_CLASS_MAPPING.headerDiv },
    children: ths.map((th, i) => {
			if (i === (ths.length - 1)) th.children[0].value = '';
			return {
				type: 'element',
				tagName: 'div',
				properties: { className: PROP_TABLE_CLASS_MAPPING.headerDivChild },
				children: th.children,
			}
    }),
  };
  const makeDlChild = (label, children) => ({
    type: 'element',
    tagName: 'div',
    properties: { className: PROP_TABLE_CLASS_MAPPING.detailsContentDlChild },
    children: [
      {
        type: 'element',
        tagName: 'dt',
        properties: { className: PROP_TABLE_CLASS_MAPPING.detailsContentDlDt },
        children: [{ type: 'text', value: label }],
      },
      {
        type: 'element',
        tagName: 'dd',
        properties: { className: PROP_TABLE_CLASS_MAPPING.detailsContentDlDd },
        children,
      },
    ],
  });
  const detailRows = tBodyTrs.map(tr => {
    const tds = tr.children.filter(c => c.type === 'element' && c.tagName === 'td');
		tds.forEach(td => {
			td.children.forEach(node => {
				processElementCodeInline(node);
			});
		});
    const [nameTd, typeTd, defaultTd, descriptionTd] = tds;
    const summaryTds = tds.slice(0, -1);
    const contentDiv = {
      type: 'element',
      tagName: 'div',
      properties: { className: PROP_TABLE_CLASS_MAPPING.detailsContent },
      children: [{
				type: 'element',
				tagName: 'dl',
				properties: { className: PROP_TABLE_CLASS_MAPPING.detailsContentDl, 'aria-label': 'Info' },
				children: [
					makeDlChild('Name', nameTd?.children ?? [], false),
					makeDlChild('Description', descriptionTd?.children ?? []),
					makeDlChild('Type', typeTd?.children ?? []),
					makeDlChild('Default', defaultTd?.children ?? []),
				],
      }],
    };
    return {
      type: 'element',
      tagName: 'details',
      properties: { className: PROP_TABLE_CLASS_MAPPING.details },
      children: [
        {
          type: 'element',
          tagName: 'summary',
          properties: { className: PROP_TABLE_CLASS_MAPPING.detailsSummary },
          children: [
            ...summaryTds.map(td => {
							td.children.forEach(node => processElementCodeInline(node))
							return {
								type: 'element',
								tagName: 'div',
								properties: { className: PROP_TABLE_CLASS_MAPPING.detailsSummaryChild },
								children: td.children,
							}
						}),
            {
              type: 'element',
              tagName: 'div',
              properties: { className: PROP_TABLE_CLASS_MAPPING.detailsSummaryChevronChild },
              children: [{
                type: 'element',
                tagName: 'svg',
                properties: {
                  width: '10',
                  height: '10',
                  viewBox: '0 0 10 10',
                  fill: 'none',
                  xmlns: 'http://www.w3.org/2000/svg',
                },
                children: [{
                  type: 'element',
                  tagName: 'path',
                  properties: {
                    d: 'M1 3.5L5 7.5L9 3.5',
                    stroke: 'currentColor',
                  },
                  children: [],
                }],
              }],
            },
          ],
        },
        contentDiv,
      ],
    };
  });
  return {
    type: 'element',
    tagName: 'div',
    properties: { className: PROP_TABLE_CLASS_MAPPING.containerDiv },
    children: [{
			type: 'element',
			tagName: 'div',
			properties: { className: PROP_TABLE_CLASS_MAPPING.tableDiv },
			children: [headerDiv, ...detailRows],
		},],
  };
}

function processElementCodeInline(node) {
  if (!node || node.type !== 'element') return;
  node.properties = node.properties || {};
  node.properties.className = TAG_DEFAULT_CLASS_MAPPING[node.tagName];
  if (!node.children) return;
  const reJinja = /({{.*?}}|{%.+?%})/;
  node.children = node.children.map(child => {
    if (child.type !== 'text') return child;
    const value = child.value;
    if (!reJinja.test(value)) return child;
    if (
      value.includes('{% verbatim %}') ||
      value.includes('{% endverbatim %}')
    ) {
      return child;
    }
    return {
      type: 'text',
      value: `{% verbatim %}${value}{% endverbatim %}`,
    };
  });
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

function rehypeCotton() {
  return (tree) => {
  const cottonNodes = [];
  visit(tree, 'element', (node) => {
    if (!node.tagName?.startsWith('c-')) return;
    cottonNodes.push({ node });
  });
  for (const { node } of cottonNodes) {
    visit(node, 'text', (node, index, parent) => {
      const processed = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeDocsTree)
        .use(rehypeStringify)
        .processSync(node.value);
      parent.children[index] = {
        type: 'raw',
        value: String(processed)
      };
      });
  }
  };
}

function rehypeDocsTree(options) {
	const MAPPING_NODE_FUNC = {
		figure: processElementFigure,
		pre:  	processElementPre,
		code:   processElementCode,
		h2:   	processElementHeader,
		h3:   	processElementHeader,
    h4:   	processElementHeader,
    h5:   	processElementHeader,
		p:  	processElementParagraph,
		a:		processElementAnchor,
		strong: processElementStrong,
		ul:		processElementUl,
		li:		processElementLi,
		table:  processElementTable,
		thead:  processElementTableHeadBody,
		tbody:  processElementTableHeadBody,
		tr:   	processElementTr,
		th:   	processElementTh,
		td:   	processElementTd,
	};
	const executeTags = Object.keys(MAPPING_NODE_FUNC).filter(tag =>
		(!options?.include || options.include.includes(tag)) &&
		(!options?.exclude || !options.exclude.includes(tag))
	)
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName === 'table') {
				const propTable = tryProcessPropTable(node);
				if (propTable) {
					parent.children[index] = propTable;
					return SKIP;
				}
			}
			if (executeTags.includes(node.tagName)) {
				MAPPING_NODE_FUNC[node.tagName]?.(node, index, parent);
			}
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

async function processMarkdown(markdownContent, dir, name) {
	const headingRe = /^(#{2,5})\s(.+)$/gm;
	const directiveRe = /:::(\w+)\s*\n([\s\S]*?):::/g;
	const combinedRe = new RegExp(`${headingRe.source}|${directiveRe.source}`, 'gm');
	const codeBlockRe = /```(\w+)\s*\n([\s\S]*?)```/g;
	const headingMatches = [];
	const directiveMatches = [];
	const codeBlockMatches = [];

	let matchedHeading = null;
	let contentSansDirectivesAndBlocks = markdownContent.replace(combinedRe, (match, headingNum, headingName, directive, directiveContent) => {
		if (headingName) {
			matchedHeading = headingName;
			headingMatches.push({ headingNum: headingNum, headingName: matchedHeading});
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
    .use(rehypeRaw)
    .use(rehypeCotton)
		.use(rehypeDocsTree, {
			exclude: ['figure', 'pre']
		})
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(contentSansDirectivesAndBlocks);

	let html = String(fileSansDirectivesAndBlocks);

	await Promise.all(codeBlockMatches.map(async ({ lang, code}, i) => {
		let content = `\`\`\`${lang}\n${code}\n\`\`\``;
		if (['html', 'python', 'css'].includes(lang)) {
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

	let partials = [];
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

		const exampleCode = String(fileDirective)
		const exampleCodeIncludesPython = String(fileDirective).includes('python</c-tabs.trigger>')
		
		const headingName = slugify(heading ?? "example");
		const exampleAlign = exampleConfigs[headingName]?.align ?? exampleDefaultConfig?.align;
		const exampleClass = [exampleDefaultConfig?.class, exampleConfigs[headingName]?.class].filter(Boolean).join(' ');

		const block = `
			<c-example id="${headingName}">
				<c-example.preview${exampleAlign ? ` align="${exampleAlign}"` : ''}${exampleClass ? ` class="${exampleClass}"` : ''}>
					${firstCodeBlock}
				</c-example.preview>
				<c-example.code class="[&_[data-rehype-pretty-code-figure]]:m-0! [&_[data-rehype-pretty-code-figure]]:rounded-t-none! [&_[data-rehype-pretty-code-figure]]:border-t!">
					${exampleCode}
					<c-button variant="ghost" size="icon"
						@click="copyCode()"
						data-copied="false"
						data-slot="copy-button"
						class="absolute ${exampleCodeIncludesPython ? `top-1.5!` : 'top-3!'} z-10 size-7! bg-code hover:opacity-100 focus-visible:opacity-100"
					>
						{% heroicon_outline 'square-2-stack' stroke_width=2 x_show="!copied" %}
						{% heroicon_outline 'check' stroke_width=2 x_show="copied" %}
					</c-button>
				</c-example.code>
			</c-example>
		`;
		if (headingName !== 'example' && exampleCodeIncludesPython) {
			html = html.replace(`<div data-directive="${i}"></div>`, `<div id="${headingName}-partial" hx-get="{% url 'docs:components:${name}:${headingName}' %}" hx-trigger="load"></div>` );
			partials.push({ heading: headingName, partial: block})
		}
		else {
			html = html.replace(`<div data-directive="${i}"></div>`, block);
		}
	}))
	const context = { headings: headingMatches }
	return { html: html, partials: partials, context: context}
}

const files = readdirSync(INPUT_DIR, { recursive: true }).filter((f) => f.endsWith('.md'));

await Promise.all(files.map(async (file) => {
	const dir = dirname(file);
	const name = basename(file, '.md');

	const raw = readFileSync(join(INPUT_DIR, file), 'utf-8');
	const { data: frontmatter, content } = matter(raw);
	const { html, partials, context } = await processMarkdown(content, dir, name);

	mkdirSync(join(OUTPUT_DIR_JSON, dir), { recursive: true });
	writeFileSync(join(OUTPUT_DIR_JSON, dir, `${name}.json`), JSON.stringify({ frontmatter, context: context }));

	mkdirSync(join(OUTPUT_DIR_TEMPLATES, dir, name), { recursive: true });
	writeFileSync(join(OUTPUT_DIR_TEMPLATES, dir, name, 'build.html'), html);
	partials.forEach((p) => writeFileSync(join(OUTPUT_DIR_TEMPLATES, dir, name, `${p.heading}.html`), p.partial));

	console.log(`✓ ${name}`);
}));