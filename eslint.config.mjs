import js from '@eslint/js';
import node from 'eslint-plugin-n';

export default [
	js.configs.recommended,
	{...node.configs['flat/recommended-script'], files: ['index.js']},
	{...node.configs['flat/recommended-module'], files: ['cli.mjs']}
];
