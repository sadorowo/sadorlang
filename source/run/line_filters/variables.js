const { Failure } = require('../../util/globals');
const { memory } = require('..');
const Regex = require('../../util/regex_types');
const Helpers = require('../../util/helpers');

module.exports = function (line) {
    if (Helpers.removeIndents(line).startsWith('#')) return true;
    
    if (/^val ([a-zA-Z0-9\/\\.]+) = ([a-zA-Z0-9]+)?(.*)$/g.test(line)) {
        const [, Name, TypeValue] = line.matchAll(/^val ([a-zA-Z0-9\/\\.]+) = (([a-zA-Z0-9]+)?(.*))$/g).next()?.value

        if (typeof memory[Name] !== "undefined" && memory[Name]?.['mutable']) 
        throw new Failure({ name: 'MismatchFailure', message: 'cannot convert mutable variable to immutable' })

        memory[Name] = { value: Helpers.typeConvert(TypeValue), mutable: false };
    } else if (/^val mut ([a-zA-Z0-9\/\\.]+) = ([a-zA-Z0-9]+)?(.*)$/g.test(line)) {
        const [, Name, TypeValue] = line.matchAll(/^val mut ([a-zA-Z0-9\/\\.]+) = (([a-zA-Z0-9]+)?(.*))$/g).next()?.value

        if (typeof memory[Name] !== "undefined" && !memory[Name]?.['mutable']) 
        throw new Failure({ name: 'MismatchFailure', message: 'cannot convert immutable variable to mutable' })

        memory[Name] = { value: Helpers.typeConvert(TypeValue), mutable: true };
    } else if (/^val ([a-zA-Z0-9\/\\.]+) = \$([a-zA-Z0-9]+)(.*)$/g.test(line)) {
        const [, Name, RawValue] = line.matchAll(/^val ([a-zA-Z0-9\/\\.]+) = \$([a-zA-Z0-9]+)(.*)$/g.test(line)).next()?.value
        
        // if (!Helpers.is_module(Path)) 
        // throw new Failure({ name: 'ModuleFailure', message: `module ${Path} not found, build using sl crmod [name]` })
    }
}