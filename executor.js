const { readFileSync } = require('fs');
const { nil } = require('./globals');
const { join } = require('path');
const Failure = require('./failures');
const regexes = require('./regexes');

function main(raw_code, from_file) {
    if (typeof __sadorlang === undefined)
        globalThis['__sadorlang'] = {}

    if (!raw_code)
        throw new Failure('CompilerFailure', `Failed to run file ${raw_code || nil}`)

    let code = from_file
        ? readFileSync(join('.', raw_code)).toString('utf-8')
        : process.argv.slice(2).join(' ');

    for (const variable of code.match(regexes.TYPE_VARIABLE_REGEX) || []) 
    {
        const [rawName, value] = variable.split('=');

        const name = rawName.trim().split(' ').pop()
        if (__sadorlang[name])
            throw new Failure('VariableFailure', 'Variable already declared');

        __sadorlang[name] = { __value: value.trim(), __ismut: false };
    }

    for (const variable of code.match(regexes.MUTABLE_VARIABLE_REGEX) || []) 
    {
        const [rawName, value] = variable.split('=');

        if (!rawName || !value) return;

        const name = rawName.trim().split(' ').pop()
        if (__sadorlang[name])
            throw new Failure('VariableFailure', 'Variable already declared');

        __sadorlang[name] = { __value: value.trim().split('\n').join(''), __ismut: true };
    }

    for (const variable of code.match(regexes.REPLACING_VARIABLE_VALUE_REGEX) || []) 
    {
        const [rawName, value] = variable.split('>');

        const name = rawName.trim().split(' ').pop()
        const { __value, __ismut } = __sadorlang[name] || {}
        
        if (!__value || !__ismut)
            throw new Failure('VariableFailure', 'Variable not declared or not mutable, cannot repl');

        __sadorlang[name] = { __value: value.trim().split('\n').join(''), __ismut: true };
    }

    //TODO: function parameters
    for (const fnDefinition of code.match(regexes.TYPE_FUNCTION_REGEX) || []) 
    {
        const [name, raw_code] = [
            fnDefinition.split(/\(.*\)/g).shift().split(' ').pop(),
            fnDefinition.split(/def fn [a-zA-Z].*\(.*\) {([^]*.*)}/gm)[1].trim()
        ]

        __sadorlang[name] = {
            __value: function () {
                main(raw_code, false)
            }, __ismut: false
        }
    }

    for (const variable of code.match(regexes.USING_VARIABLE_REGEX) || [])
    {
        const { __value, __ismut } = __sadorlang[variable.slice(1)] || {};
        if (typeof __value === "function") continue;

        if (!__value || !__ismut) throw new Failure('VariableFailure', `Variable ${variable.slice(1)} not declared or not mutable`)
        else if (typeof __value !== "function") code = code.replace(variable, __value)
    }

    for (const fn of code.match(regexes.FUNCTION_EXEC_REGEX) || []) 
    {
        const [name, value] = fn.matchAll(/\$([a-zA-Z]+)\((.*)\)/g).next().value?.slice(1) || []

        __sadorlang[name]['__value']?.(...value.split(' ') || value)
    }
}

main(process.argv[2], true)