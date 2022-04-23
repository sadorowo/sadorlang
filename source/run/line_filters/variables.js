const { Failure } = require('../../util/globals');
const { memory } = require('..');
const Helpers = require('../../util/helpers');

module.exports = function (_, line) {
    if (Helpers.removeIndents(line).startsWith('#')) return true;
    
    if (/^val ([a-zA-Z0-9\/\\.]+) = ([a-zA-Z0-9]+)?(.*)$/g.test(line)) {
        const [, Name, TypeValue] = line.matchAll(/^val ([a-zA-Z0-9\/\\.]+) = (([a-zA-Z0-9]+)?(.*))$/g).next()?.value

        if (typeof memory[Name] !== "undefined" && memory[Name]?.['mutable']) 
        throw new Failure({ name: 'MismatchFailure', message: `use [lock ${Name}] in order to lock this variable` })

        memory[Name] = { value: Helpers.typeConvert(TypeValue), mutable: false };
    } else if (/^val mut ([a-zA-Z0-9\/\\.]+) = ([a-zA-Z0-9]+)?(.*)$/g.test(line)) {
        const [, Name, TypeValue] = line.matchAll(/^val mut ([a-zA-Z0-9\/\\.]+) = (([a-zA-Z0-9]+)?(.*))$/g).next()?.value

        if (typeof memory[Name] !== "undefined" && !memory[Name]?.['mutable']) 
        throw new Failure({ name: 'MismatchFailure', message: `use [unlock ${Name}] in order to unlock this variable` })

        memory[Name] = { value: Helpers.typeConvert(TypeValue), mutable: true };
    } else if (/^lock ([a-zA-Z0-9\/\\.]+)$/g.test(line)) {
        const [, Name] = line.matchAll(/^lock ([a-zA-Z0-9\/\\.]+)$/g).next()?.value

        if (typeof memory[Name] === "undefined")
            throw new Failure({ name: 'VariableFailure', message: 'variable not found' })

        if (!memory[Name]?.mutable)
            throw new Failure({ name: 'MismatchFailure', message: 'variable already locked' })

        memory[Name] = { value: memory[Name].value, mutable: false };
    } else if (/^unlock ([a-zA-Z0-9\/\\.]+)$/g.test(line)) {
        const [, Name] = line.matchAll(/^unlock ([a-zA-Z0-9\/\\.]+)$/g).next()?.value

        if (typeof memory[Name] === "undefined")
            throw new Failure({ name: 'VariableFailure', message: 'variable not found' })

        if (memory[Name]?.mutable)
            throw new Failure({ name: 'MismatchFailure', message: 'variable not locked' })

        memory[Name] = { value: memory[Name].value, mutable: true };
    } else if (/([a-zA-Z]+):?([a-zA-Z]+)\((.*)\)/g.test(line))
    Helpers.typeConvert(line); else return 0;
}
