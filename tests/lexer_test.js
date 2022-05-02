const { readFileSync } = require('fs');
const { join } = require('path');
const lexer = require('../lexer/lexer');

const code = readFileSync(join(__dirname, '..', 'examples', 'basic.sl'));

lexer.reset(code.toString());
while (true) {
	const actualToken = lexer.next();
	if (actualToken) console.log('FOUND TOKEN:', actualToken);
	else break;
}
