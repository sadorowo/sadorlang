const { Failure, nil, Object } = require('./globals');
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

function typeConvert(raw, convertVariables = true) {
    if (/^method ([a-zA-Z]+)\((.*)?\) {$/g.test(removeIndents(raw))) return;
    
    else if (/\{([^.]+)\}/g.test(raw)) {
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

        if (removeIndents(raw) !== raw) return;
        let [FunctionName, FunctionArguments] = [Raw[1].split(':') || Raw[1], Raw[4]?.split(/,\s|,/g)
            ?.map(typeConvert) || []]

        if (FunctionName.length === 2) {
            if (typeof memory[FunctionName[0]] !== "object")
                throw new Failure({ name: 'TypeFailure', message: `expected class, found ${typeof memory[FunctionName[0]]}` })

            if (typeof memory[FunctionName[0]]?.value?.[FunctionName[1]] !== "object")
                throw new Failure({ name: 'MethodFailure', message: `method ${FunctionName[1]} not found in this class` })

            const { value } = memory[FunctionName[0]]?.value?.[FunctionName[1]];

            value(...FunctionArguments)
        } else {
            if (memory[FunctionName[0]]?.value instanceof global.Object) {
                const value = memory[FunctionName[0]]?.value;
                const object = {};

                for (const field of global.Object.keys(value)) {
                    object[field] = FunctionArguments[global.Object.keys(value).indexOf(field)] || value[field];
                    memory[field] = { value: FunctionArguments[global.Object.keys(value).indexOf(field)] || value[field], mutable: true }
                }

                return object;
            }

            const { value, arguments } = memory[FunctionName[0]];

            for (const argument of global.Object.keys(memory[FunctionName[0]]?.value).filter((val) => typeof val === 'string')) {
                const [providedArgument, funcArgument] = [FunctionArguments[arguments.indexOf(argument)], argument];
                memory[funcArgument] = { value: providedArgument || nil, mutable: true };
            }

            if (typeof value !== "function" && !global.Object.keys(value))
                throw new Failure({ name: 'MethodFailure', message: 'this class is not callable' })

            if (typeof value === "object") return value
            return value(...FunctionArguments)
        }
    }

    else if (/"(.*)"/g.test(raw)) return raw.slice(1, -1);
    else if (/[0-9]/g.test(raw)) return Number(raw);
    else if (typeof memory[raw] !== "undefined" && convertVariables) return memory[raw]?.value;
    else if (raw && convertVariables) throw new Failure({ name: 'TypeFailure', message: `found variable/line with unknown type ${raw}` });
    else return raw;
}

module.exports = { is_module, wait, print_progress, removeIndents, typeConvert }