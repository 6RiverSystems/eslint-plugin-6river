import plugin from 'eslint-plugin-jest';
import globals from 'globals';

export default [
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},
];
