const { readFileSync } = require('fs');
const { Failure } = require('../util/globals');
const { join } = require('path');
const C = require('chalk');

console.log = () => true;

const check = module.exports.check = function (code) {
    try {
        require('../run').run(code, false);
    } catch (error) {
        console.log(`${C.red('❌')} Detected error:\n\n`, error);
    } finally {
        console.log(`${C.red('✔️')} Code is valid, no errors detected`);
    }
}

if (process.argv[2] === 'check') {
    if (!process.argv[3])
        throw new Failure({ name: 'ArgumentFailure', message: 'file not found' })

    const code = readFileSync(join(process.argv[3])).toString('utf-8').trim().replace(/\r\n/g, '\n\n').split('\n');
    check(code)
}