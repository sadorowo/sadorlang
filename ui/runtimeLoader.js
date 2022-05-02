const { readdirSync, readFileSync } = require('fs');
const { join } = require('path');

let runtimeCode = '';
for (const runtimeType of readdirSync(join(__dirname, '..', 'runtime'))) {
    runtimeCode += readFileSync(join(__dirname, '..', 'runtime', runtimeType)).toString()
}

module.exports = runtimeCode;