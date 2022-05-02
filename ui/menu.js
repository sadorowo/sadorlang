const { readFileSync } = require('fs');
const { join } = require('path');

const option = process.argv[2];
const path = process.argv[3];
const code = path
	? readFileSync(join(process.cwd(), path)).toString().replace(/\r\n/g, '\n')
	: null;

switch (option) {
	case 'comp':
	case 'compile': {
		const parser = require('../parser/parser');

		parser.feed(code);
		console.log(parser.results);
		break;
	}
}
