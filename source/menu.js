const { Failure } = require('./util/globals');
const { readFileSync } = require('fs');
const { join } = require('path');
require('colors');

switch (process.argv[2]) {
	case 'run':
	case 'r':
	case 'exec':
	case 'exc':
	case 'ex': {
		if (!process.argv[3])
			throw new Failure({
				name: 'ArgumentFailure',
				message: 'file not found',
			});

		const code = (module.exports.code = readFileSync(join(process.argv[3]))
			.toString('utf-8')
			.trim()
			.replace(/\r\n/g, '\n\n')
			.split('\n'));
		require('./run').run(code);
		break;
	}
	case 'check':
	case 'c':
	case 'ch':
		require('./check');
		break;
	case 'crmod':
	case 'cmod':
	case 'crm':
		require('./crmod');
		break;
	case 'rmmod':
	case 'delmod':
	case 'delm':
	case 'rmod':
	case 'dmod':
		require('./rmmod');
		break;
	case undefined:
		console.log(`
            cfslang helper [3]
            use ${"'run'".green} in order to run program
            available commands:

            [check|c|ch] [file_path] - check file validity
            [run|r|exec|exc|ex] [file_path] - run program
            [crmod|crm|cmod] [name] - create module
            [delmod|rmmod|delm|rmod|dmod] [name] - delete module

            * - show this message
        `.replace(/\[(.*)\]/g, (match) => match.yellow));
		break;
	default:
		throw new Failure({
			name: 'StrFailure',
			message: `invalid argument: ${process.argv[2]}`,
		});
}
