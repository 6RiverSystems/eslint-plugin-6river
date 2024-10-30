/**
 * Temporary script to help convert eslint configs
 *
 * node convert-config.js --configs=react,typescript
 */

const fs = require('node:fs');
const { execSync } = require('node:child_process');
const readline = require('node:readline');

/**
 * Creating eslint.config.mjs
 */

const defaultIgnores = [
	'.rush',
	'dist',
	'dist/',
	'dist*/',
	'node_modules',
	'coverage/',
	'.prettierrc.js',
	'eslint.config.mjs',
	'.eslintrc.js',
];

// Helper function to parse command line arguments
function parseArgs() {
	const args = process.argv.slice(2);
	const options = {};

	args.forEach((arg, index) => {
		if (arg.startsWith('--')) {
			const key = arg.replace('--', '');
			const value = args[index + 1] && !args[index + 1].startsWith('--') ? args[index + 1] : true;
			options[key] = value;
		}
	});

	return options;
}

// Parse command line arguments
const argv = parseArgs();

// Check if .eslintrc.js exists
if (!fs.existsSync('.eslintrc.js')) {
	console.error('.eslintrc.js not found!');
	process.exit(1);
}

// Check if .eslintignore exists
if (!fs.existsSync('.eslintignore')) {
	console.error('.eslintignore not found!');
	process.exit(1);
}

// Read the content of .eslintrc.js
const eslintrcContent = fs.readFileSync('.eslintrc.js', 'utf-8');

// Read the content of .eslintignore and format it for the ignores array
const eslintignoreContent = fs.readFileSync('.eslintignore', 'utf-8');
const ignores = eslintignoreContent
	.split('\n')
	.filter(Boolean)
	.filter((line) => !defaultIgnores.includes(line))
	.map((line) => `     '${line}',`)
	.join('\n');

// Extract the rules section from .eslintrc.js
const rulesMatch = eslintrcContent.match(/rules: \{([\s\S]*?)\}/);
const rules = rulesMatch ? rulesMatch[1].trim() : '';

const configs = argv.configs ? argv.configs.split(',') : [];
const includesReact = configs.includes('react');

// Create the new eslint.config.mjs content
const eslintConfigContent = `
import eslintPluginSixriver from 'eslint-plugin-6river';

export default [
${
	ignores.length > 0
		? `// Global ignores
  {
    ignores: [
${ignores}
    ],
  },

`
		: ''
}  // 6RS Shared config
  ...eslintPluginSixriver.generateConfig(import.meta.dirname, ${JSON.stringify(configs)}),

  // Package specific rules
  {
    files: ['**/*.${includesReact ? '{ts,tsx}' : 'ts'}'],
    rules: {
      ${rules}
    },
  }
];
`;

// Write the new eslint.config.mjs file
fs.writeFileSync('eslint.config.mjs', eslintConfigContent.trim());

console.log('eslint.config.mjs has been created.');

/**
 * Updating package.json
 */

// Read the content of package.json
const packageJsonPath = 'package.json';
const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
const packageJson = JSON.parse(packageJsonContent);

// Filter out dependencies and devDependencies that include 'eslint' in the name except 'eslint' and 'eslint-config-6river'
const filterDependencies = (deps) => {
	if (!deps) return {};
	return Object.keys(deps)
		.filter((dep) => dep === 'eslint' || dep === 'eslint-plugin-6river' || !dep.includes('eslint'))
		.reduce((acc, dep) => {
			acc[dep] = deps[dep];
			return acc;
		}, {});
};

packageJson.dependencies = filterDependencies(packageJson.dependencies);
packageJson.devDependencies = filterDependencies(packageJson.devDependencies);

// Write the updated package.json back to the file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('package.json has been updated.');

// Run rush update
try {
	console.log('running rush update');
	const rushUpdateOutput = execSync('rush update');
	console.log(`rush update done: ${rushUpdateOutput}`);

	console.log('linting');

	// Run the linter
	const eslintOutput = execSync('pnpx eslint . --ignore-pattern=.eslintrc.js --fix');
	console.log(`ESLint stdout: ${eslintOutput}`);

	// Ask for confirmation that everything is ok
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.question('Does everything look good? (y/n) ', (answer) => {
		if (answer.toLowerCase() === 'y') {
			fs.unlinkSync('.eslintrc.js');
			fs.unlinkSync('.eslintignore');
			console.log('.eslintrc.js and .eslintignore have been removed.');
		} else {
			console.log('Exiting...');
		}
		rl.close();
	});
} catch (error) {
	console.error(`Error: ${error.message}`);
}
