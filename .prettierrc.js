const base = require('@6river/prettier-config');
module.exports = {
	...base,
	proseWrap: 'always',
	overrides: [
		...base.overrides,
		{
			files: '*.yaml',
			options: {
				printWidth: 80,
			},
		},
	],
};
