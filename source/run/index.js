const { readFileSync, readdirSync } = require('fs');
const { Failure } = require('../util/globals');
const { join } = require('path');

module.exports.memory = {};
require('../util/global_variables');
const run = module.exports.run = function (code, export_code = true) {
    if (export_code) module.exports.code = code;

    for (const line of code) {
        for (const checkFunction of readdirSync(join(process.cwd(), 'source', 'run', 'line_filters')).map((file) => require(`./line_filters/${file}`)))
            checkFunction(line)
    }
}

if (process.argv[2] === 'run') {
    if (!process.argv[3])
        throw new Failure({ name: 'ArgumentFailure', message: 'file not found' })

    const code = module.exports.code = readFileSync(join(process.argv[3]))
        .toString('utf-8')
        .trim()
        .replace(/\r\n/g, '\n\n')
        .split('\n');
    run(code)
}