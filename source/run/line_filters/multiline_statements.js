const { Failure, nil } = require('../../util/globals');
const { code, memory, run } = require('..');
const Regex = require('../../util/regex_types');
const Helpers = require('../../util/helpers');

module.exports = function (line) {
    if (Helpers.removeIndents(line).startsWith('#')) return true;
    
    if (/^method ([a-zA-Z].*)\(.*\) {$/g.test(line)) {
        const [, Name, TypeValue] = line.matchAll(/^method ([a-zA-Z].*)\((.*)\) {$/g).next()?.value
        const arguments = TypeValue.split(/,\s|,/g);

        if (TypeValue.length && !arguments.length)
        throw new Failure({ name: 'TypeFailure', message: 'please separate func arguments by comma' })

        for (const argument of arguments) memory[argument] = { value: nil, mutable: true }
        
        let actualLineIndex = code.indexOf(line) + 1
        let functionCode = ''

        while (!/^}$/g.test(code[actualLineIndex])) {
            if (code[actualLineIndex] && Helpers.removeIndents(code[actualLineIndex]) === code[actualLineIndex])
            throw new Failure({ name: 'TypeFailure', message: `no indent detected at line ${actualLineIndex / 2 + 1}` })

            functionCode += Helpers.removeIndents(code[actualLineIndex]) + '\n'
            actualLineIndex++
        }

        memory[Name] = {
            value: () => run(functionCode
                .trim()
                .replace(/\r\n/g, '\n\n')
                .split('\n')),
            arguments,
            mutable: false
        }
    } 
}