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

### Pre-set Configurations

#### Node & Mocha

```js
import eslintPlugin6river from 'eslint-plugin-6river';

export default [...eslintPlugin6river['node-mocha']];
```

#### Browser & Jest

```js
import eslintPlugin6river from 'eslint-plugin-6river';

export default [...eslintPlugin6river['browser-jest']];
```

### Custom Configuration

```js
import eslintPlugin6river from 'eslint-plugin-6river';

export default [
	{
		plugins: {
			'6river': eslintPlugin6river,
		},
		rules: {
			'6river/rule-name': 'error',
		},
	},
];
```

## Supported Rules

- **new-cap**: Similar to the ESLint core rule but adds an `@` prefix to decorator functions, making
  it easier to apply regex rules to all decorators.
