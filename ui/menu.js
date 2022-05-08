const { join, basename, dirname } = require('path');
const { readFileSync, rmSync } = require('fs');
const { exec } = require('child_process');
const Failure = require('../runtime/failure');
require('colors');

const option = process.argv[2];
const path = process.argv[3];
const code = path
	? readFileSync(join(process.cwd(), path)).toString().replace(/\r\n/g, '\n')
	: null;

switch (option) {
	case 'r':
	case 'run':
	case 'exec': {
		require('./compiler')(code);
		require('../ui/generator').main(path + '.ast');
		const baseDir = dirname(path);
		const jsFilename = join(baseDir, basename(path, '.sl') + '.js');

		exec(`node ${jsFilename}`, (_, stdout, stderr) => {
			if (stderr) throw new Failure(stderr);

			console.log(stdout);

			rmSync(jsFilename);
			rmSync(jsFilename.replace('.js', '.sl.ast'));
		});
		break;
	}

	case 'c':
	case 'com':
	case 'comp':
	case 'compile': {
		require('./compiler')(code);

		console.log(`${'[INFO]'.green} compiled code successfully`);
		break;
	}

	default:
		console.log(
			`
			SadorLang helper

			${'[run|r|exec]'.yellow} run program
			${'[comp|c|com|compile]'.yellow} compile program
			${'[info|sys|informations|data]'.yellow} informations about SadorLang scripter
		`.replace(/	/g, '')
		);
		break;
}
