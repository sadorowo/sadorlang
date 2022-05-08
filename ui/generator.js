const { readFileSync, writeFileSync, readdirSync } = require('fs');
const { join, dirname, basename } = require('path');
const Failure = require('../runtime/failure');
require('colors');

module.exports.runtime = require('./runtimeLoader');
module.exports.generateFunction = generateFunction;
module.exports.generate = generate;
module.exports.indent = indent;

function generate(node) {
	for (const functionCheck of readdirSync(
		join(__dirname, '..', 'definitions')
	).map((v) => require(join(__dirname, '..', 'definitions', v)))) {
		const value = functionCheck(node);
		if (value) return value;
	}
}

function generateFunction(statements, parameters, name = '') {
	const body =
		statements
			.map((statement, idx) => {
				const js = generate(statement);
				if (idx === statements.length - 1)
					return ['var', 'return'].some(
						(v) => js.startsWith(v) || js === v
					) && js
						? js
						: `return ${js}`;
				else return js;
			})
			.join(';\n') + ';';

	const indentedBody = indent(body);
	const params = parameters.map(generate).join(', ');
	return `function ${name}(${params}) {\n${indentedBody}\n}`;
}

function indent(string) {
	return string
		.split('\n')
		.map((line) => '\t' + line)
		.join('\n');
}

function main(name) {
	const filename = name || process.argv[2];
	if (!filename) throw new Failure('provide filename');

	const astCode = JSON.parse(
		readFileSync(join(process.cwd(), filename)).toString()
	);
	const generatedCode = generate(astCode);
	const baseDirectory = dirname(filename);
	const baseFileName = basename(filename, '.sl.ast');
	const convertedFilename = join(baseDirectory, baseFileName + '.js');

	writeFileSync(
		convertedFilename,
		generatedCode.replace(/function if\(/g, 'if(')
	);
	console.log(`${'[INFO]'.green} wrote ${convertedFilename} successfully`);
}

if (!process.argv[2]) main()

module.exports.main = main