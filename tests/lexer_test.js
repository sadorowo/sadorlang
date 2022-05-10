const { readFileSync } = require('fs');
const { join } = require('path');
const lexer = require('../lexer/lexer');

const code = readFileSync(join(__dirname, '..', 'examples', 'basic.sl'));

module.exports.run = function () {
	const tokens = [];

	lexer.reset(code.toString());
	while (true) {
		const actualToken = lexer.next();
		if (actualToken) tokens.push(actualToken);
		else break;
	};

	return tokens;
};
