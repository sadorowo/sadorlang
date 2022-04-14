const { Failure } = require('./util/globals');
const option = process.argv[2];

switch (option) {
    case 'run': require('./run'); break;
    case undefined: console.log(`
    SadorLang helper [1]
    use 'run' in order to run program

    available commands:
    run [file_path] - run program
    [nil] - show this message
    `); break;
    default: throw new Failure({ name: 'StrFailure', message: `invalid argument: ${option}` }); break;  
} 