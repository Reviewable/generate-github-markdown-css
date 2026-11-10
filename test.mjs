import test from 'ava';
import nock from 'nock';
import generateCss from './index.js';

test.before(() => {
	nock.disableNetConnect();
});

test.after.always(() => {
	nock.cleanAll();
	nock.enableNetConnect();
});

test('scopes the styles used by rendered GitHub Markdown', async t => {
	nock('https://api.github.com')
		.post('/markdown', ({mode, text}) => mode === 'gfm' && text.startsWith('## GitHub Markdown fixture'))
		.reply(200, '<h1>Heading</h1>');
	nock('https://github.com')
		.get('/')
		.reply(200, '<link rel="stylesheet" href="https://github.githubassets.com/assets/markdown.css">');
	nock('https://github.githubassets.com')
		.get('/assets/markdown.css')
		.reply(200, 'h1 { color: red; } .unused { color: blue; }', {'Content-Type': 'text/css'});

	const css = await generateCss();

	t.regex(css, /\.markdown-body h1\s*\{\s*color: red;/u);
	t.notRegex(css, /\.unused/u);
	t.deepEqual(nock.pendingMocks(), []);
});
