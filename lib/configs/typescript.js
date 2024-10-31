import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';

import plugin from '../plugin.js';

const sixriverJsRules = {
	// prettier owns most formatting rules now
	'max-len': ['warn', 120, 2],

	curly: ['error', 'all'],
	'prefer-const': ['error'],
	'no-console': ['error'],
	'no-fallthrough': ['error'],
	'no-undef': ['error'],
	'no-var': ['error'],
	strict: ['error', 'global'],
	'object-shorthand': 'error',
	'no-await-in-loop': 'error',
	eqeqeq: 'error',
	'require-jsdoc': 'off',
	'import/order': [
		'error',
		{
			groups: [['builtin'], ['external'], ['internal', 'parent', 'sibling', 'index']],
			'newlines-between': 'always',
			alphabetize: {
				order: 'asc',
			},
		},
	],
	'import/no-self-import': 'error',
	'import/newline-after-import': 'error',
};

export default [
	// Global ignore list, must only have this key
	// https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
	{
		ignores: [
			'.rush',
			'dist*/',
			'node_modules',
			'coverage/',
			'.prettierrc.js',
			'eslint.config.mjs',
		],
	},

	// Typescript gives an array of rules, because why not
	...ts.configs.recommended,

	// Our rules, customize 6River stuff here
	{
		name: 'eslint-plugin-6river-typescript',
		files: ['**/*.{ts,tsx}'],
		plugins: {
			'6river': plugin,
			import: eslintPluginImport,
			unicorn: eslintPluginUnicorn,
		},
		rules: {
			...sixriverJsRules,
			'@typescript-eslint/no-empty-object-type': ['off'],
			'@typescript-eslint/no-explicit-any': ['off'],
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-unnecessary-condition': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					caughtErrors: 'none',
					argsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
			'@typescript-eslint/triple-slash-reference': 'error',
			'6river/new-cap': ['error', { capIsNewExceptionPattern: '^@' }],
			'new-cap': 'off',
			'no-cond-assign': [2, 'always'],
			'no-undef': 'off',
			'no-unused-vars': 'off',
			'valid-jsdoc': 'off',
			'no-invalid-this': 'off',
			'unicorn/numeric-separators-style': [
				'error',
				{ number: { minimumDigits: 0, groupLength: 3 } },
			],
		},
		settings: {
			'import/resolver': {
				node: {
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			},
		},
		linterOptions: {
			noInlineConfig: false,
			reportUnusedDisableDirectives: 'warn',
		},
	},

	{
		name: 'eslint-plugin-6river-javascript',
		files: ['**/*.{js,jsx,mjs,cjs}'],
		plugins: {
			'6river': plugin,
			import: eslintPluginImport,
		},
		rules: {
			...js.configs.recommended.rules,
			...sixriverJsRules,
		},
	},

	// Config file overrides
	{
		files: ['.prettierrc.js'],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
];
