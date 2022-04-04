import { readFileSync } from 'fs';
import { join } from 'path';
import regexes from './regexes';

globalThis['__sadorlang'] = {}

const code = readFileSync(join('.', process.argv[0]));
const variablesToReplace = code.matchAll(regexes.USING_VARIABLE_REGEX);
const variables = code.matchAll(regexes.TYPE_VARIABLE_REGEX);

for (const variable of variablesToReplace) {
    
}

for (const variable of variables) {
    const [name, value] = variable.split('=');

    if (globalThis['__sadorlang'][name.split(' ').pop()])
    throw 
    globalThis['__sadorlang'][name.split(' ').pop()] = value;
}