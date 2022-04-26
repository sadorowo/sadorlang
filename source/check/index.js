const { readFileSync } = require('fs');
const { Failure } = require('../util/globals');
const { join } = require('path');
require('colors');

const originalConsoleLog = console.log;
const check = (module.exports.check = function (code) {
	try {
		console.log = () => true;
		require('../run').run(code);
		console.log = originalConsoleLog;

		console.log(`${'✔️'.green} Code is valid, no errors detected`);
	} catch (error) {
		console.log = originalConsoleLog;
		console.log(
			`${'❌'.red} Detected error:\n\nName: ${error.name}\nMessage: ${
				error.message
			}`
		);
	}
});

if (process.argv[2] === 'check') {
	if (!process.argv[3])
		throw new Failure({
			name: 'ArgumentFailure',
			message: 'file not found',
		});

	const code = readFileSync(join(process.argv[3]))
		.toString('utf-8')
		.trim()
		.replace(/\r\n/g, '\n\n')
		.split('\n');
	check(code);
}
