import js from '@eslint/js';
import node from 'eslint-plugin-n';

export default [
	js.configs.recommended,
	{...node.configs['flat/recommended-script'], files: ['cli.js', 'index.js']},
	{files: ['cli.js', 'index.js'], languageOptions: {ecmaVersion: 2017}},
	{
		files: ['cli.js'],
		// Node 8 strips the executable's hashbang before parsing CommonJS.
		rules: {'n/no-unsupported-features/es-syntax': ['error', {ignores: ['hashbang']}]}
	}
];
