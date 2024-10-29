# eslint-plugin-6river

A set of ESLint plugins and configurations used by 6river.

## Installation

First, install [ESLint](http://eslint.org):

```sh
npm install eslint --save-dev
```

Then, install `eslint-plugin-6river`:

```sh
npm install eslint-plugin-6river --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag), you must also install
`eslint-plugin-6river` globally.

## Usage

This plugin requires ESLint 9 or later.

You can use this plugin with pre-set configurations, or you can configure it yourself.

### Generate a config

This is the recommended way to generate a configuration.

```js
import eslintPluginSixriver from 'eslint-plugin-6river';

export default [...eslintPluginSixriver.generateConfig(import.meta.dirname, ['node', 'mocha'])];
```

Supported config names can be found in the generate-config.js file.

### Pre-set Configurations

#### TypeScript

This is the base opinionated TS configuration that you probably don't need to use by yourself. Use
one of the ecosystem versions below which extend this config.

```js
import eslintPlugin6river from 'eslint-plugin-6river';

export default [...eslintPlugin6river.configs['typescript']];
```

### Custom Configuration

```js
import eslintPlugin6river from 'eslint-plugin-6river';

export default [
	{
		files: ['**/*.{ts,tsx}'],
		plugins: {
			'6river': eslintPlugin6river,
		},
		rules: {
			'6river/rule-name': 'error',
		},
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
];
```

## Supported Rules

- **new-cap**: Similar to the ESLint core rule but adds an `@` prefix to decorator functions, making
  it easier to apply regex rules to all decorators.
