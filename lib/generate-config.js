import browserConfig from './configs/browser.js';
import jestConfig from './configs/jest.js';
import mochaConfig from './configs/mocha.js';
import nodeConfig from './configs/node.js';
import typescriptConfig from './configs/typescript.js';
import reactConfig from './configs/react.js';

const configs = {
	node: nodeConfig,
	browser: browserConfig,
	mocha: mochaConfig,
	jest: jestConfig,
	react: reactConfig,
};

/**
 * Generates a TypeScript ESLint configuration, and optionally includes additional 6RS configured eslint configurations.
 *
 * @param {string} tsconfigRootDir - The root directory of the TypeScript configuration.
 * @param {Array<"node" | "browser" | "mocha" | "jest" | "react">} configNames - Additional configurations to include beyond typescript.
 * @returns {Array<Object>} The generated ESLint configuration.
 * @throws {Error} If the tsconfigRootDir is not provided.
 * @example
 * import { generateConfig } from 'eslint-plugin-6river';
 *
 * export default [
 * 		...generateConfig(import.meta.dirname, ['node', 'mocha'])
 * ]
 */
export function generateConfig(tsconfigRootDir, configNames = []) {
	const generatedConfig = [];

	if (!tsconfigRootDir) {
		throw new Error('Must supply a tsconfig root dir for eslint-typescript to work');
	}

	generatedConfig.push(...typescriptConfig);
	generatedConfig.push({
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir,
			},
		},
	});

	for (const preset of configNames) {
		if (preset in configs) {
			generatedConfig.push(...configs[preset]);
		}
	}

	return generatedConfig;
}
