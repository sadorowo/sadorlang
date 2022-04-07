const { readFileSync } = require('fs');
const { nil } = require('./globals');
const { join } = require('path');
const Failure = require('./failures');
const regexes = require('./regexes');

function main(raw_code, from_file) {
    if (typeof __slGlobalThis === undefined)
        globalThis['__slGlobalThis'] = {}

    if (!raw_code)
        throw new Failure('CompilerFailure', `failed to run file ${raw_code || nil}`)

    const codeLines = from_file
        ? readFileSync(join('.', raw_code)).toString('utf-8').replace(/\r\n/g, '\n').split('\n')
        : process.argv.slice(2).join(' ');

    for (let line of codeLines) {
        if (regexes.TYPE_VARIABLE_REGEX.test(line)) {
            const [rawName, value] = line.split(/=(.*)/s);

            const name = rawName.trim().split(' ').pop()
            if (__slGlobalThis[name])
                throw new Failure('VariableFailure', 'variable already declared');

            __slGlobalThis[name] = { __value: value.trim(), __ismut: false };
        } 
        
        if (regexes.MUTABLE_VARIABLE_REGEX.test(line)) {
            const [rawName, value] = line.split(/=(.*)/s);

            const name = rawName.trim().split(' ').pop()

            if (__slGlobalThis[name])
                throw new Failure('VariableFailure', 'variable already declared');

            __slGlobalThis[name] = { __value: value.trim().split('\n').join(''), __ismut: true };
        } 
        
        if (regexes.REPLACING_VARIABLE_VALUE_REGEX.test(line)) {
            const [rawName, value] = line.split(/>(.*)/s);

            const name = rawName.trim().split(' ').pop()
            const { __value, __ismut } = __slGlobalThis[name] || {}

            if (!__value || !__ismut)
                throw new Failure('VariableFailure', 'variable not declared or not mutable, cannot repl');

            __slGlobalThis[name] = { __value: value.trim().split('\n').join(''), __ismut: true };
        } 
        
        if (regexes.USING_VARIABLE_REGEX.test(line)) {
            for (const variable of line.matchAll(regexes.USING_VARIABLE_REGEX)) {
                const name = variable.shift()
                const { __value, __ismut } = __slGlobalThis[name.slice(1)] || {};

                if (typeof __value === "function") continue;

                if (!__value || !__ismut) throw new Failure('VariableFailure', `variable ${name.slice(1)} not declared or not mutable`)
                else if (typeof __value !== "function") line = line.replace(name, __value)
            }
        } 
        
        if (regexes.FUNCTION_EXEC_REGEX.test(line)) {
            const [name, value] = line.matchAll(/\$([a-zA-Z]+)\((.*)\)/g).next().value?.slice(1) || []

            __slGlobalThis[name]['__value']?.(...value.split(' ') || value)
        }

    }
}

main(process.argv[2], true)