const { Failure } = require('../../util/globals');
const { readFileSync } = require('fs');
const { memory, run } = require('..');
const { join } = require('path');
const Regex = require('../../util/regex_types');
const Helpers = require('../../util/helpers');

require('../../util/global_variables');
module.exports = function (line) {
    if (Helpers.removeIndents(line).startsWith('#')) return;
    
    if (/^include "([a-zA-Z]+)"$/g.test(line)) {
        const [, Path] = line.matchAll(/^include "([a-zA-Z]+)"$/g).next()?.value
        
        if (!Helpers.is_module(Path)) 
        throw new Failure({ name: 'ModuleFailure', message: `module ${Path} not found, build using sl crmod [name]` })

        run(
            readFileSync(join(process.cwd(), Path, 'main.sl')).toString('utf-8').trim().replace(/\r\n/g, '\n\n').split('\n'),
            false
        )
    }
}