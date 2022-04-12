const { Failure } = require('../../util/globals');
const Regex = require('../../util/regex_types');
const Helpers = require('../../util/helpers');

module.exports = function (line) {
    if (Helpers.removeIndents(line).startsWith('#')) return;
    
    if (/^val ([a-zA-Z0-9\/\\.]+) = ([a-zA-Z0-9]+)?(.*)$/g.test(line)) {
        const [, Name, TypeValue] = line.matchAll(/^val ([a-zA-Z0-9\/\\.]+) = (([a-zA-Z0-9]+)?(.*))$/g).next()?.value
        
        console.log(r)
        // if (!Helpers.is_module(Path)) 
        // throw new Failure({ name: 'ModuleFailure', message: `module ${Path} not found, build using sl crmod [name]` })
    }

    if (/^val ([a-zA-Z0-9\/\\.]+) = \$([a-zA-Z0-9]+)(.*)$/g.test(line)) {
        const r = line.matchAll(/^val ([a-zA-Z0-9\/\\.]+) = \$([a-zA-Z0-9]+)(.*)$/g.test(line)).next()?.value
        
        console.log(r)
        // if (!Helpers.is_module(Path)) 
        // throw new Failure({ name: 'ModuleFailure', message: `module ${Path} not found, build using sl crmod [name]` })
    }
}