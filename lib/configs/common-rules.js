module.exports = {
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
