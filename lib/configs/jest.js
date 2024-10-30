import globals from 'globals';

import eslintPluginJest from 'eslint-plugin-jest';

export default [
	eslintPluginJest.configs['flat/recommended'],
	{
		rules: {
			'jest/valid-title': ['error', { ignoreTypeOfDescribeName: true }],
		},
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			globals: {
				...globals.jest,
			},
		},
	},
	{
		files: ['**/jest.config.js'],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
];
