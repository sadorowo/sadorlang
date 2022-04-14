const { Failure } = require('../../util/globals');
const { memory } = require('..');
const Regex = require('../../util/regex_types');
const Helpers = require('../../util/helpers');

require('../../util/global_variables');
module.exports = function (line) {
    if (Helpers.removeIndents(line).startsWith('#')) return;
    
    if (/^include "([a-zA-Z]+)"$/g.test(line)) {
        const [, Path] = line.matchAll(/^include "([a-zA-Z]+)"$/g).next()?.value
        
        if (!Helpers.is_module(Path)) 
        throw new Failure({ name: 'ModuleFailure', message: `module ${Path} not found, build using sl crmod [name]` })
    }
}