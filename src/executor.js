const { Failure, nil } = require('../types/globals');
const { readFileSync } = require('fs');
const { join } = require('path');
const regexes = require('../types/regexes');

function main(raw_code, from_file) {
    if (typeof __slGlobalThis === undefined)
        globalThis['__slGlobalThis'] = {}

    if (!raw_code)
        throw new Failure('CompilerFailure', `failed to run file ${raw_code}`)

    __slGlobalThis['Import'] = {
        __value: function (path) {
            if (path.split('/').pop() === process.argv[2].split('/').pop())
                throw new Failure('InfiniteLoopFailure', 'infinite loop detected')

            const file = readFileSync(join('.', path)).toString('utf-8').replace(/\r\n/g, '\n').trim();

            main(file, false)
        }
    }

    const codeLines = (from_file
        ? readFileSync(join('.', raw_code)).toString('utf-8').replace(/\r\n/g, '\n').trim().split('\n')
        : raw_code.split('\n'));

    for (let line of codeLines) {
        if (regexes.TYPE_FUNCTION_VARIABLE_REGEX.test(line.split(/    /g).join(''))) {
            const [rawName, value] = line.split(/=(.*)/s);

            const name = rawName.trim().split(' ').pop()
            const functionName = /\$([a-zA-Z].*)+\([^)]*\)/g.exec(value)[1];

            if (__slGlobalThis[name])
                throw new Failure('VariableFailure', 'variable already declared');

            for (const argument of value.split(' ') || [value])
                for (const parameter of __slGlobalThis[functionName]?.__functionParameters)
                    __slGlobalThis[parameter] = { __value: argument, __ismut: false }

            const functionParameters = regexes.FUNCTION_EXEC_REGEX.exec(value
            .split(/    /g).join('').trim())[2].split(/,\s|,/g) || []

            __slGlobalThis[name] = {
                __value: __slGlobalThis[functionName]?.['__value']?.(...functionParameters.map((p) => __slGlobalThis[p.slice(1)]?.__value || p)),
                __ismut: false
            };
        }

        if (regexes.MUTABLE_FUNCTION_VARIABLE_REGEX.test(line.split(/    /g).join(''))) {
            const [rawName, value] = line.split(/=(.*)/s);

            const name = rawName.trim().split(' ').pop()
            const functionName = /\$([a-zA-Z].*)+\([^)]*\)/g.exec(value)[1];

            const { __value, __ismut } = __slGlobalThis[name] || {};

            if (__value && !__ismut)
                throw new Failure('VariableFailure', 'variable already declared');

            for (const argument of value.split(' ') || [value])
                for (const parameter of __slGlobalThis[name]?.__functionParameters || [])
                    __slGlobalThis[parameter] = { __value: argument, __ismut: false }

            const functionParameters = regexes.FUNCTION_EXEC_REGEX.exec(value
            .split(/    /g).join('').trim())[2].split(/,\s|,/g) || []

            __slGlobalThis[name] = {
                __value: __slGlobalThis[functionName]?.['__value']?.(...functionParameters.map((p) => __slGlobalThis[p.slice(1)]?.__value || p)),
                __ismut: true
            };
        }

        if (regexes.TYPE_VARIABLE_REGEX.test(line) && !regexes.TYPE_FUNCTION_VARIABLE_REGEX.test(line)) {
            const [rawName, value] = line.split(/=(.*)/s);

            const name = rawName.trim().split(' ').pop()
            if (__slGlobalThis[name])
                throw new Failure('VariableFailure', 'variable already declared');

            __slGlobalThis[name] = { __value: value.trim(), __ismut: false };
        }

        if (regexes.MUTABLE_VARIABLE_REGEX.test(line) && !regexes.MUTABLE_FUNCTION_VARIABLE_REGEX.test(line)) {
            const [rawName, value] = line.split(/=(.*)/s);

            const name = rawName.trim().split(' ').pop()
            const { __value, __ismut } = __slGlobalThis[name] || {};

            if (__value && !__ismut)
                throw new Failure('VariableFailure', 'variable already declared');

            __slGlobalThis[name] = { 
                __value: regexes.MUTABLE_FUNCTION_VARIABLE_REGEX.test(line)
                ? __value
                : value.trim(), 
                __ismut: true 
            };
        }

        if (regexes.FUNC_DEF_START.test(line)) {
            const functionDefinition = line.match(regexes.FUNC_DEF_START).shift().split(/\s{(.*)/s).shift()

            const [name, parameters] = [
                functionDefinition.split(/def fn ([a-zA-Z].*)\(.*\)/g)[1],
                functionDefinition.split(/.*\((.*)\)/g)[1].split(' ')
            ]

            for (const parameter of parameters)
                __slGlobalThis[parameter] = { __value: nil, __ismut: true }

            let actualLineIndex = codeLines.indexOf(line) + 1
            let functionCode = ''

            while (!regexes.FUNC_DEF_END.test(codeLines[actualLineIndex])) {
                functionCode += codeLines[actualLineIndex] + '\n'
                actualLineIndex++
            }

            __slGlobalThis[name] = {
                __value: () => main(functionCode.split(/    /g).join('\n'), false),
                __functionParameters: parameters,
                __ismut: false
            }
        }

        if (regexes.REPLACING_VARIABLE_VALUE_REGEX.test(line)) {
            const [rawName, value] = line.split(/>(.*)/s);

            const name = rawName.trim().split(' ').pop()
            const { __value, __ismut } = __slGlobalThis[name] || {}

            if (typeof __value === 'function')
                throw new Failure('VariableFailure', 'variable is function, cannot repl');

            if (!__value || !__ismut)
                throw new Failure('VariableFailure', 'variable not declared or not mutable, cannot repl');

            __slGlobalThis[name] = { __value: value.trim().split('\n').join(''), __ismut: true };
        }

        if (regexes.USING_VARIABLE_REGEX.test(line)) {
            for (const variable of line.matchAll(regexes.USING_VARIABLE_REGEX)) {
                const name = variable.shift()
                const { __value } = __slGlobalThis[name.slice(1)] || {};

                if (typeof __value === "function") continue;

                if (typeof __value === "undefined") throw new Failure('VariableFailure', `variable ${name.slice(1)} not declared or not mutable`)
                else if (typeof __value !== "function") line = line.replace(name, __value)
            }
        }

        if (regexes.EVERY_FUNC_DEF_START.test(line)) {
            const every = line.match(regexes.EVERY_FUNC_DEF_START)
            .shift()
            .split(/\s{(.*)/s)
            .shift()
            .split(' ')
            .pop()

            let actualLineIndex = codeLines.indexOf(line) + 1
            let functionCode = ''

            while (!regexes.EVERY_FUNC_DEF_END.test(codeLines[actualLineIndex])) {
                functionCode += codeLines[actualLineIndex] + '\n'
                actualLineIndex++
            }

            if (functionCode.split('\n').some(
            (line) => regexes.TYPE_VARIABLE_REGEX.test(line.split(/    /g).join('')) ||
            regexes.TYPE_FUNCTION_VARIABLE_REGEX.test(line.split(/    /g).join(''))))
            throw new Failure('TypeFailure', 'you can define only mutable variables in loops')

            if (every < 1000) throw new Failure('MemoryFailure', 'you must set time in ms, greater than 999')
            setInterval(() => main(functionCode.split(/    /g).join('\n'), false), every)
        }

        if (regexes.FUNCTION_EXEC_REGEX.test(line)) {
            const [name, value] = line.matchAll(/\$([a-zA-Z]+)\((.*)\)/g).next().value?.slice(1) || []

            for (const argument of value.split(' ') || [value])
                for (const parameter of __slGlobalThis[name]?.__functionParameters || [])
                    __slGlobalThis[parameter] = { __value: argument, __ismut: false }

            __slGlobalThis[name]?.['__value']?.(...value.split(' ').map((p) => __slGlobalThis[p.slice(1)]?.__value || p) || value)
        }
    }
}

main(process.argv[2], true)