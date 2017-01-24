import fs from 'fs';
import test from 'ava';
import execa from 'execa';

test('main', async t => {
	const {stdout} = await execa('./cli.js', ['fixture.html']);
	t.is(stdout, 'urls-md');
});

test('stdin', async t => {
	const {stdout} = await execa('./cli.js', {
		input: fs.readFileSync('fixture.html')
	});
	t.is(stdout, 'urls-md');
});
