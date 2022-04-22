const { Failure } = require('./util/globals');
const option = process.argv[2];

switch (option) {
    case 'run': require('./run'); break;
    case 'check': require('./check'); break;
    case undefined: console.log(`
    cfslang helper [2]
    use 'run' in order to run program

    available commands:
    run [file_path] - run program
    check [file_path] - check validity of code
    [nil] - show this message
    `); break;
    default: throw new Failure({ name: 'StrFailure', message: `invalid argument: ${option}` });
} 