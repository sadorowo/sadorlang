const { readFileSync } = require('fs');
const { nil } = require('./globals');
const { join } = require('path');
const Failure = require('./failures');
const regexes = require('./regexes');

if (typeof __sadorlang === undefined)
globalThis['__sadorlang'] = {}

if (!process.argv[2])
throw new Failure('CompilerFailure', `Failed to run file ${process.argv[2] || nil}`)

let code = readFileSync(join('.', process.argv[2])).toString('utf-8');

for (const variable of code.match(regexes.TYPE_VARIABLE_REGEX) || []) {
    const [rawName, value] = variable.split('=');
    
    const name = rawName.trim().split(' ').pop()
    if (__sadorlang[name])
    throw new Failure('VariableFailure', 'Variable already declared');
    
    __sadorlang[name] = value.trim();
}

for (const variable of Array.from(code.match(regexes.USING_VARIABLE_REGEX))) 
if (typeof __sadorlang[variable.slice(1)] === "undefined") throw new Failure('VariableFailure', `Variable ${variable.slice(1)} not declared`)
else if (typeof __sadorlang[variable.slice(1)] !== "function") code = code.replace(variable, __sadorlang[variable.slice(1)])

for (const fn of Array.from(code.match(regexes.FUNCTION_EXEC_REGEX) || [])) {
    const [name, value] = fn.matchAll(/\$([a-zA-Z]+)\((.*)\)/g).next().value?.slice(1) || []

    __sadorlang[name]?.(...value.split(' ') || value)
}