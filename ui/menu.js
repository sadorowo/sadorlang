const { join, basename, dirname } = require('path');
const { readFileSync, rmSync } = require('fs');
const { exec } = require('child_process');
const Failure = require('../runtime/failure');
require('colors');

const notFlag = (f) => !f.startsWith('-');
const isFlag = (a) => !notFlag(a);

const options = process.argv.filter(notFlag);
const flags = process.argv.filter(isFlag).map((v) => v.slice(1));
const option = options[2];
const path = options[3];
const code = path
	? readFileSync(join(process.cwd(), path)).toString().replace(/\r\n/g, '\n')
	: null;

switch (option) {
	case 'r':
	case 'run':
	case 'exec': {
		require('./compiler')(options, code);
		require('../ui/generator').main(options, path + '.json');
		const baseDir = dirname(path);
		const jsFilename = join(baseDir, basename(path, '.sl') + '.js');

		exec(`node ${jsFilename}`, (_, stdout, stderr) => {
			if (stderr) throw new Failure(stderr);

			console.log(stdout);

			rmSync(jsFilename);
			rmSync(jsFilename.replace('.js', '.sl.json'));
		});
		break;
	}

	case 'c':
	case 'com':
	case 'comp':
	case 'compile': {
		require('./compiler')(options, code);

		if (!flags.includes('s')) console.log(`${'[INFO]'.green} compiled code successfully`);
		break;
	}

	case 'info':
	case 'sys':
	case 'informations':
	case 'data': {
		if (!flags.includes('s')) console.log(
			`
			SadorLang scripter ${`[v${require('../package.json').version}]`.yellow}

			built using Moo & Nearley
			author: ${require('../package.json').author}
		`.replace(/	/g, '')
		);
		break;
	}

	case 'lexer':
	case 'lexer-test': {
		if (!flags.includes('s')) console.log(`${'[IMPORTANT]'.red} you should see something similar to this: [{...}, {...}, {...}] (... - anyting)`)
		if (!flags.includes('s')) console.log(`${'[IMPORTANT]'.red} result: ${JSON.stringify(require('../tests/lexer_test').run())
		.split(',').map((s) => s.green).join(',')}`)
		break;
	}

	default:
		if (!flags.includes('s')) console.log(
			`
			SadorLang helper

			${'[run|r|exec]'.yellow} run program
			${'[comp|c|com|compile]'.yellow} compile program
			${'[lexer|lexer-test]'.yellow} text lexer
			${'[info|sys|informations|data]'.yellow} informations about SadorLang scripter
		`.replace(/	/g, '')
		);
		break;
}
