import { readFileSync } from 'fs';
import { join } from 'path';
import { Failure } from './failures';
import regexes from './regexes';

globalThis['__sadorlang'] = {}

const code = readFileSync(join('.', process.argv[0]));
const variablesToReplace = code.matchAll(regexes.USING_VARIABLE_REGEX);
const variables = code.matchAll(regexes.TYPE_VARIABLE_REGEX);

for (const variable of variablesToReplace) {
    code.replace(variable, globalThis['__sadorlang'][variable.slice(1)])
}

for (const variable of variables) {
    const [name, value] = variable.split('=');

    if (globalThis['__sadorlang'][name.split(' ').pop()])
    throw Failure('VariableFailure', 'Variable already declared');

    globalThis['__sadorlang'][name.split(' ').pop()] = value;
}
