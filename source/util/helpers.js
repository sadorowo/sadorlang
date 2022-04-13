const { Failure, nil } = require('./globals');
const { readdirSync } = require('fs');
const { memory } = require('../run');
const { join } = require('path');

function is_module(name) {
    try {
        const files = readdirSync(join(process.cwd(), name), { withFileTypes: true });
        return ['mod.yaml', 'main.sl'].some((item) => files.indexOf(item) === -1)
    } catch { return false; }
};

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
};

function print_progress(desc, progress) {
    console.log(`
${desc}

[${'█'.repeat(progress === 1 ? progress : progress / 2)}] ${progress}%
`)
};

function removeIndents(line) {
    return line.split(/^\s+/g).join('')
}

memory['Console'] = {
    'Println': {
        value: function (...text) {
            console.log(...text)
        },
        arguments: ['text']
    }
}
function typeConvert(raw) {
    if (/\{([^.]+)\}/g.test(raw)) {
        const convertedValue = raw
        .match(/\{([^.]+)\}/g)
        .shift()
        .match(/([^.",]+)/g)
        .slice(1, -1)
        .filter((v) => v.trim());

        if (!convertedValue?.length) throw new Failure({ name: 'TypeFailure', message: 'found unknown type in variable value' });

        return convertedValue
    }

    else if (/([a-zA-Z]+):?([a-zA-Z]+)\((.*)\)/g.test(raw)) {
        const Raw = raw.matchAll(/(([a-zA-Z]+:)?([a-zA-Z]+))\((.*)\)/g).next()?.value;
        const [FunctionName, FunctionArguments] = [Raw[1].split(':') || Raw[1], Raw[4]?.split(/,\s|,/g)?.map(typeConvert) || []]

        if (Array.isArray(FunctionName)) {
            if (typeof memory[FunctionName[0]] !== "object")
            throw new Failure({ name: 'TypeFailure', message: `expected class, found ${typeof memory[FunctionName[0]]}` })

            if (typeof memory[FunctionName[0]]?.[FunctionName[1]] !== "object")
            throw new Failure({ name: 'MethodFailure', message: `method ${FunctionName[1]} not found in this class` })

            const { value, arguments } = memory[FunctionName[0]]?.[FunctionName[1]];

            for (const argument of arguments) memory[argument] = nil;
            value(...FunctionArguments)
        } else {
            const { value, arguments } = memory[FunctionName[0]];
            for (const argument of arguments) memory[argument] = nil;
            value(...FunctionArguments)
        }
    }

    else if (/"(.*)"/g.test(raw)) return raw.slice(1, -1);
    else if (/[0-9]/g.test(raw)) return Number(raw);
    else if (typeof memory[raw] !== "undefined") return memory[raw]?.value;

    else throw new Failure({ name: 'TypeFailure', message: 'found variable with unknown type' })
}

module.exports = { is_module, wait, print_progress, removeIndents, typeConvert }