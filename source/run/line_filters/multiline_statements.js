const { Failure, nil } = require('../../util/globals');
const { code, memory, run } = require('..');
const Helpers = require('../../util/helpers');

module.exports = function (line) {
    if (Helpers.removeIndents(line).startsWith('#')) return true;
    
    if (/^method ([a-zA-Z]+)\(.*\) {$/g.test(line)) {
        const [, Name, TypeValue] = line.matchAll(/^method ([a-zA-Z]+)\((.*)\) {$/g).next()?.value
        const arguments = TypeValue.split(/,\s|,/g);

        if (TypeValue.length && !arguments.length)
        throw new Failure({ name: 'TypeFailure', message: 'please separate func arguments by comma' })

        for (const argument of arguments) memory[argument] = { value: nil, mutable: true }

        memory[Name] = {
            value: () => run(to_method(code, line)
                .trim()
                .replace(/\r\n/g, '\n\n')
                .split('\n')),
            arguments,
            mutable: false
        }
    } else if (/^object ([a-zA-Z]+) {$/g.test(line)) {
        const [, Name] = line.matchAll(/^object ([a-zA-Z]+) {$/g).next()?.value

        if (typeof memory[Name] !== "undefined")
        throw new Failure({ name: 'TypeFailure', message: 'variable with this name already exists' })

        let actualLineIndex = code.indexOf(line) + 1

        const object = {};

        while (!/^}$/g.test(code[actualLineIndex])) {
            if (/^method ([a-zA-Z]+)\(\) {$/g.test(Helpers.removeIndents(code[actualLineIndex])))
            { 
                const [, Name] = /^method ([a-zA-Z]+)\(\) {$/g.exec(Helpers.removeIndents(code[actualLineIndex]));

                object[Name] = { 
                    value: () => run(to_method(code, line, false).trim()
                    .replace(/\r\n/g, '\n\n')
                    .split('\n')),
                    arguments: [],
                    mutable: false 
                }; 
                actualLineIndex++ 
            }

            const name = Helpers.removeIndents(code[actualLineIndex]).split(' ').pop();

            if (code[actualLineIndex]) object[name] = memory[name] = { value: nil, mutable: true };
            actualLineIndex++
        }

        memory[Name] = {
            value: object,
            arguments: [],
            mutable: false
        }
    } 
}

function to_method(code, line, check_indents = true) {
    let actualLineIndex = code.indexOf(line) + 1
    let functionCode = ''

    while (!/}/g.test(code[actualLineIndex])) {
        if (check_indents && code[actualLineIndex] && Helpers.removeIndents(code[actualLineIndex]) === code[actualLineIndex])
            throw new Failure({ name: 'TypeFailure', message: `no indent detected at line ${actualLineIndex / 2 + 1}` })

        functionCode += Helpers.removeIndents(code[actualLineIndex]) + '\n'
        actualLineIndex++
    }

    return functionCode
}