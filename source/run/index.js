const { readFileSync, readdirSync } = require('fs');
const { Failure } = require('../util/globals');
const { join } = require('path');

const memory = module.exports.memory = {};
const run = module.exports.run = function (code) {
    module.exports.code = code;
    for (const line of code) {
        for (const checkFunction of readdirSync(join(process.cwd(), 'source', 'run', 'line_filters')).map((file) => require(`./line_filters/${file}`)))
        
        checkFunction(line)
        // throw new Failure({ name: 'SyntaxFailure', message: 'invalid syntax' })
    }
}

if (!process.argv[3])
throw new Failure({ name: 'ArgumentFailure', message: 'file not found' })

const code = module.exports.code = readFileSync(join(process.argv[3])).toString('utf-8').trim().replace(/\r\n/g, '\n\n').split('\n');
run(code)