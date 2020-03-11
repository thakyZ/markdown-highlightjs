import * as vscode from 'vscode';
// import { definer } from 'highlightjs-graphql';

const hljsDefineGraphQL = hljs => {
	return {
		aliases: ['gql'],
		keywords: {
			keyword:
				'query mutation subscription|10 input schema implements type interface union scalar fragment|10 enum on ...',
			literal: 'ID ID! String Float Int Boolean',
			variable: 'true false null'
		},
		contains: [
			hljs.HASH_COMMENT_MODE,
			hljs.QUOTE_STRING_MODE,
			hljs.NUMBER_MODE,
			{
				className: 'literal',
				begin: '[^\\w][A-Z][a-z]',
				end: '\\W',
				excludeEnd: true
			},
			{
				className: 'literal',
				begin: ':\\s\\[',
				end: '[\\]!]{1,3}',
				excludeBegin: true,
				excludeEnd: true
			},
			{
				className: 'type',
				begin: '[^\\w](?!ID)[A-Z][A-Z]',
				end: '\\W',
				excludeEnd: true
			},
			//   {
			//     className: "literal",
			//     begin: "[^\\w]ID",
			//     end: "\\W",
			//     excludeEnd: true,
			//     relevance: 10
			//   },
			{
				className: 'name',
				begin: '\\$',
				end: '\\W',
				excludeEnd: true
			},
			{
				className: 'meta',
				begin: '@',
				end: '\\W',
				excludeEnd: true
			}
		],
		illegal: /([;<']|BEGIN)/
	};
};

export function activate(context: vscode.ExtensionContext) {
	return {
		extendMarkdownIt(md: any) {
			// console.log('hljsGql', definer.toString());

			return md.use(require('markdown-it-highlightjs'), {
				register: { graphql: hljsDefineGraphQL }
			});
		}
	};
}

export function deactivate() {}
