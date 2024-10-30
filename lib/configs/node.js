import globals from 'globals';

export default [
	{
		files: ['**/*.ts'],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
];
