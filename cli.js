#!/usr/bin/env node
import fs from 'node:fs';
import process from 'node:process';
import meow from 'meow';
import getStdin from 'get-stdin';
import articleTitle from 'article-title';

const cli = meow(`
	Usage
	  $ article-title <file>
	  $ curl -L <url> | article-title

	Example
	  $ curl -L https://blog.sindresorhus.com/macos-tips-tricks-13046cf377f8 | article-title
	  Fabulous macOS Tips & Tricks
`, {
	importMeta: import.meta,
});

const input = cli.input[0];

if (!input && process.stdin.isTTY) {
	console.error('Specify a file');
	process.exit(1);
}

const init = data => {
	console.log(articleTitle(data));
};

(async () => {
	if (input) {
		init(fs.readFileSync(input, 'utf8'));
	} else {
		init(await getStdin());
	}
})();
