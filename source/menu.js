const { Failure } = require('./util/globals');
const { readFileSync } = require('fs');
const { join } = require('path');

switch (process.argv[2]) {
    case 'run': case 'r': {
        if (!process.argv[3])
        throw new Failure({ name: 'ArgumentFailure', message: 'file not found' })

        const code = module.exports.code = readFileSync(join(process.argv[3]))
            .toString('utf-8')
            .trim()
            .replace(/\r\n/g, '\n\n')
            .split('\n');
        require('./run').run(code)
        break
    }
    case 'crmod': require('./crmod'); break;
    case 'rmmod': case 'delmod': require('./rmmod'); break;
    case undefined: console.log(`
        cfslang helper [3]
        use 'run' in order to run program
        available commands:
        run [file_path] - run program
        crmod [name] - create module
        delmod [name] - delete module
        [nil] - show this message
    `); break;
    default: throw new Failure({ name: 'StrFailure', message: `invalid argument: ${option}` });  
}  