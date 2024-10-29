import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import rules from './rules/index.js';

const pkgPath = join(import.meta.dirname, '../package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

const plugin = {
	meta: {
		name: pkg.name,
		version: pkg.version,
	},
	rules,
};

export default plugin;
