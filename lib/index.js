import plugin from './plugin.js';
import { generateConfig } from './generate-config.js';

import browserConfig from './configs/browser.js';
import jestConfig from './configs/jest.js';
import mochaConfig from './configs/mocha.js';
import nodeConfig from './configs/node.js';
import reactConfig from './configs/react.js';
import typescriptConfig from './configs/typescript.js';

// https://eslint.org/docs/latest/extend/plugins#configs-in-plugins
plugin.configs = {
	browser: browserConfig,
	jest: jestConfig,
	mocha: mochaConfig,
	node: nodeConfig,
	react: reactConfig,
	typescript: typescriptConfig,
};

plugin.generateConfig = generateConfig;

export default plugin;
