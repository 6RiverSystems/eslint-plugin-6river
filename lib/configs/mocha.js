import globals from 'globals';

import eslintPluginMocha from 'eslint-plugin-mocha';

export default [
	eslintPluginMocha.configs.flat.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			globals: {
				...globals.mocha,
			},
		},
	},
];
