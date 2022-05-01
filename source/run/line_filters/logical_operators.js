const { Failure } = require('../../util/globals');
const { run } = require('..');
const Helpers = require('../../util/helpers');

module.exports = function (code, line) {
	if (Helpers.removeIndents(line).startsWith('#')) return;

	if (/^if (.*) {$/g.test(line)) {
		const [, Statement] = line.matchAll(/^if (.*) {$/g).next()?.value;
		const result = Helpers.asBool(Statement);

		if (result)
			return run(
				to_method(code, line)
					.trim()
					.replace(/\r\n/g, '\n\n')
					.split('\n')
			);
	} else return 0;
};

function to_method(code, line, check_indents) {
	let actualLineIndex = code.indexOf(line) + 1;
	let functionCode = '';

	if (!code.some((line) => /^}$/g.test(line)))
		throw new Failure({
			name: 'SyntaxFailure',
			message: 'missing statement end',
		});

	while (!/^}$/g.test(code[actualLineIndex])) {
		if (
			check_indents &&
			code[actualLineIndex] &&
			Helpers.removeIndents(code[actualLineIndex]) ===
				code[actualLineIndex]
		)
			throw new Failure({
				name: 'TypeFailure',
				message: `no indent detected at line ${
					actualLineIndex / 2 + 1
				}`,
			});

		if (
			/^return (.*)?$/g.test(Helpers.removeIndents(code[actualLineIndex]))
		)
			return functionCode;
		else
			functionCode += Helpers.removeIndents(code[actualLineIndex]) + '\n';

		actualLineIndex++;
	}

	return functionCode;
}
