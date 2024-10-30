import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

export default [
	{
		...eslintPluginReact.configs.flat.recommended,
		settings: {
			...eslintPluginReact.configs.flat.recommended?.settings,
			react: {
				...eslintPluginReact.configs.flat.recommended?.settings?.react,
				version: 'detect',
			},
		},
	},

	// https://github.com/facebook/react/issues/28313
	// While waiting for eslint-plugin-react-hooks to support eslint9, manually configure it.
	// If you're reading this in 2025 or later, you probably can delete this and just use
	// the predefined flat config once this is merged and release:
	// https://github.com/facebook/react/pull/30774
	{
		files: ['**/*.{ts,tsx}'],
		plugins: {
			'react-hooks': eslintPluginReactHooks,
		},
		rules: eslintPluginReactHooks.configs.recommended.rules,
	},
	// General react config
	{
		files: ['**/*.{ts,tsx}'],
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',
		},
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			globals: {
				React: 'readonly',
				JSX: 'readonly',
			},
		},
	},
];
