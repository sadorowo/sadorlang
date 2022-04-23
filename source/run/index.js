const { readdirSync } = require('fs');
const { join } = require('path');

module.exports.memory = {};
require('../util/global_variables');

function run(code) {
    for (const line of code) {
        for (const checkFunction of readdirSync(join(process.cwd(), 'source', 'run', 'line_filters')).map((file) => require(`./line_filters/${file}`)))
        checkFunction(code, line)
    }
}

module.exports.run = run;