const { readFileSync } = require('fs');
const { join } = require('path');
const Failure = require('./failures');
const regexes = require('./regexes');

if (typeof globalThis['__sadorlang'] === undefined)
globalThis['__sadorlang'] = {}

let code = readFileSync(join('.', process.argv[2])).toString('utf-8');

const variablesToReplace = code.match(regexes.USING_VARIABLE_REGEX)?.filter((match) => !regexes.FUNCTION_EXEC_REGEX.test(match));
const variables = code.match(regexes.TYPE_VARIABLE_REGEX);

for (const variable of variables) {
    const [rawName, value] = variable.split('=');
    
    const name = rawName.trim().split(' ').pop()
    if (globalThis['__sadorlang'][name])
    throw new Failure('VariableFailure', 'Variable already declared');
    
    globalThis['__sadorlang'][name] = value.trim();
}

for (const variable of variablesToReplace) 
code = code.replace(variable, globalThis['__sadorlang'][variable.slice(1)] || variable)

const functions = code.match(regexes.FUNCTION_EXEC_REGEX);

for (const fn of functions) {
    const [name, value] = fn.matchAll(/\$([a-zA-Z]+)\((.*)\)/g).next().value.slice(1)

    globalThis['__sadorlang'][name](value)
}