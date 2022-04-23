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

        for (const argument of arguments)
            if (!memory[argument]) memory[argument] = { value: nil, mutable: true }

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
            if (/^method ([a-zA-Z]+)\(.*\) {$/g.test(Helpers.removeIndents(code[actualLineIndex])))
            { 
                const [, Name, Arguments] = /^method ([a-zA-Z]+)\((.*)\) {$/g.exec(Helpers.removeIndents(code[actualLineIndex]));
                const FormattedArguments = Arguments.split(/,\s|,/g).filter((argument) => argument.length)

                for (const argument of FormattedArguments)
                    if (!memory[argument]) memory[argument] = { value: nil, mutable: true }

                object[Name] = { 
                    value: () => run(to_method(code, line, false).trim()
                    .replace(/\r\n/g, '\n\n')
                    .split('\n')),
                    arguments: FormattedArguments,
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
    } else if (/^once ([0-9]+) {$/g.test(line)) {
        const [, Name] = line.matchAll(/^once ([0-9]+) {$/g).next()?.value
        const Time = Number(Name);

        if (isNaN(Time)) throw new Failure({ name: 'TypeFailure', message: 'Invalid time passed' })
        if (Time < 1000) throw new Failure({ name: 'SecurityFailure', message: 'due to security reasons you must provide time in milliseconds, greater or equal than 1000' })

        setInterval(() => run(to_method(code, line)
        .trim()
        .replace(/\r\n/g, '\n\n')
        .split('\n')), Time)
    } else if (/^iter ([a-zA-Z0-9\/\.]+) from ([a-zA-Z0-9\/\.]+) {$/g.test(line)) {
        const [, Key, List] = line.matchAll(/^iter ([a-zA-Z0-9\/\.]+) from ([a-zA-Z0-9\/\.]+) {$/g).next()?.value

        if (!memory[List] || !Array.isArray(memory[List].value)) throw new Failure({ name: 'TypeFailure', message: `${List} is not iterable` })

        const method = to_method(code, line)
        .trim()
        .replace(/\r\n/g, '\n\n')
        .split('\n');

        if (method.some((line) => /^val ([a-zA-Z0-9\/\\.]+) = ([a-zA-Z0-9]+)?(.*)$/g.test(line)))
        throw new Failure({ name: 'SecurityFailure', message: 'you can define only mutable variables in loops' })

        for (const index of memory[List].value) {
            memory[Key] = {
                value: index,
                mutable: true
            };

            run(method, false)
        }
    } else return 0;
}

function to_method(code, line, check_indents = true) {
    let actualLineIndex = code.indexOf(line) + 1
    let functionCode = ''

    if (!code.some((line) => /^}$/g.test(line)))
        throw new Failure({ name: 'SyntaxFailure', message: 'missing function end' })

    while (!/}/g.test(code[actualLineIndex])) {
        if (check_indents && code[actualLineIndex] && Helpers.removeIndents(code[actualLineIndex]) === code[actualLineIndex])
            throw new Failure({ name: 'TypeFailure', message: `no indent detected at line ${actualLineIndex / 2 + 1}` })

        functionCode += Helpers.removeIndents(code[actualLineIndex]) + '\n'
        actualLineIndex++
    }

    return functionCode
}