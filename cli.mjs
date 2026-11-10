#!/usr/bin/env node
import meow from 'meow';
import githubMarkdownCss from './index.js';

meow(`
	Usage
	  github-markdown-css > <filename>
`, {importMeta: import.meta});

githubMarkdownCss().then(console.log).catch(err => console.log(err.stack));
