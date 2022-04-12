const { Failure } = require('../util/globals');
const { readFileSync } = require('fs');
const { join } = require('path');
const Checks = require('./line_filters');

function run(code) {
    for (const line of code.replace(/\r\n/g, '\n\n').split('\n')) {
        for (const checkFunction of Object.values(Checks))
        checkFunction(line);
    }
}

if (!process.argv[3])
throw new Failure({ name: 'ArgumentFailure', message: 'file not found' })

run(
    readFileSync(join(process.argv[3])).toString('utf-8').trim()
)