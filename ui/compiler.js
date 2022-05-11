const { join, basename, dirname } = require('path');
const { writeFileSync } = require('fs');
const Failure = require('../runtime/failure');
const parser = require('../parser/parser');

module.exports = function compile(options, code) {
	if (!code) throw new Failure('provide path to sadorlang script');

	parser.feed(code);

	const mainDirectory = dirname(options[3]);
	if (parser.results.length > 1) {
		for (let i = 0; i < parser.results.length; i++) {
			const ast = parser.results[i];
			const filename = join(mainDirectory, basename(options[3]) + i + '.json');

			writeFileSync(filename, JSON.stringify(ast, null, 4));
		}
	} else if (parser.results.length === 0)
	throw new Failure('unexpected end of line'); else {
		const filename = join(mainDirectory, basename(options[3]) + '.json');

		const ast = parser.results.shift();
		writeFileSync(filename, JSON.stringify(ast, null, 4));
	}
};
