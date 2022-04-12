const { Failure } = require('./util/globals');
const option = process.argv[2];

switch (option) {
    case 'run': require('./run'); break;
    case 'crmod': require('./crmod'); break;
    case 'delmod': require('./delmod'); break;
    case undefined: console.log(`
    SadorLang helper [2]
    use 'run' in order to run program

    available commands:
    run [file_path] - run program
    crmod [name] - create module
    delmod [name] - delete module
    [nil] - show this message
    `); break;
    default: throw new Failure({ name: 'StrFailure', message: `invalid argument: ${option}` }); break;  
} 