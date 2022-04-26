const { Failure } = require('../../util/globals');
const { memory, run } = require('..');
const Helpers = require('../../util/helpers');

module.exports = function (code, line) {
	if (Helpers.removeIndents(line).startsWith('#')) return;

	if (/^once ([0-9]+) {$/g.test(line)) {
		const [, Name] = line.matchAll(/^once ([0-9]+) {$/g).next()?.value;
		const Time = Number(Name);

		if (isNaN(Time))
			throw new Failure({
				name: 'TypeFailure',
				message: 'Invalid time passed',
			});
		if (Time < 1000)
			throw new Failure({
				name: 'SecurityFailure',
				message:
					'due to security reasons you must provide time in milliseconds, greater or equal than 1000',
			});

		setInterval(
			() =>
				run(
					to_method(code, line)
						.trim()
						.replace(/\r\n/g, '\n\n')
						.split('\n')
				),
			Time
		);
	} else if (
		/^iter ([a-zA-Z0-9\/\.]+) from ([a-zA-Z0-9\/\.]+) {$/g.test(line)
	) {
		const [, Key, List] = line
			.matchAll(/^iter ([a-zA-Z0-9\/\.]+) from ([a-zA-Z0-9\/\.]+) {$/g)
			.next()?.value;

		if (!memory[List] || !Array.isArray(memory[List].value))
			throw new Failure({
				name: 'TypeFailure',
				message: `${List} is not iterable`,
			});

		const method = to_method(code, line)
			.trim()
			.replace(/\r\n/g, '\n\n')
			.split('\n');

		if (
			method.some((line) =>
				/^val ([a-zA-Z0-9\/\\.]+) = ([a-zA-Z0-9]+)?(.*)$/g.test(line)
			)
		)
			throw new Failure({
				name: 'SecurityFailure',
				message: 'you can define only mutable variables in loops',
			});

		for (const index of memory[List].value) {
			memory[Key] = {
				value: index,
				mutable: false,
			};

			run(method);
		}
	} else return 0;
};

function to_method(code, line, check_indents = true) {
	let actualLineIndex = code.indexOf(line) + 1;
	let functionCode = '';

	if (!code.some((line) => /^}$/g.test(line)))
		throw new Failure({
			name: 'SyntaxFailure',
			message: 'missing function end',
		});

	while (!/}/g.test(code[actualLineIndex])) {
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

		functionCode += Helpers.removeIndents(code[actualLineIndex]) + '\n';
		actualLineIndex++;
	}

	return functionCode;
}
