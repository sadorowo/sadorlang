const { Failure, nil } = require('./globals');
const { readdirSync } = require('fs');
const { memory } = require('../run');
const { join } = require('path');
require('colors');

function is_module(name) {
	try {
		const files = readdirSync(join(process.cwd(), name), {
			withFileTypes: true,
		});
		return ['mod.yaml', 'main.sl'].some(
			(item) => files.indexOf(item) === -1
		);
	} catch {
		return false;
	}
}

function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function print_progress(desc, progress) {
	console.log(`
        ${desc}
        [${'█'.green.repeat(
			progress === 1 ? progress : progress / 2
		)}] ${progress}%
    `);
}

function removeIndents(line) {
	return line.split(/^\s+/g).join('');
}

function typeConvert(raw, convertVariables = true) {
	if (
		/^method ([a-zA-Z]+)\((.*)?\) {$/g.test(removeIndents(raw)) ||
		/^if (.*) {$/g.test(removeIndents(raw))
	)
		return;
	else if (/\{([^.]+)\}/g.test(raw)) {
		const convertedValue = raw
			.match(/\{(.*)\}/g)
			.shift()
			.trim()
			.slice(1, -1)
			.split(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)
			.filter((v) => v.trim() && v.replace(/\s/g, '') !== ',')
			.map((v) => v.slice(1, -1));

		if (!convertedValue?.length)
			throw new Failure({
				name: 'TypeFailure',
				message: 'found unknown type in variable value',
			});

		return convertedValue;
	} else if (/([a-zA-Z]+):?([a-zA-Z]+)\((.*)\)/g.test(raw)) {
		const Raw = raw
			.matchAll(/(([a-zA-Z]+:)?([a-zA-Z]+))\((.*)\)/g)
			.next()?.value;

		if (removeIndents(raw) !== raw) return;
		let [FunctionName, FunctionArguments] = [
			Raw[1].split(':') || Raw[1],
			Raw[4]
				?.split(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)
				?.filter((key) => key && ![',', ', '].includes(key))
				?.map((val) => typeConvert(val, true)) || [],
		];

		if (!memory[FunctionName[0]])
			throw new Failure({
				name: 'VariableFailure',
				message: 'unknown function',
			});

		if (FunctionName.length === 2) {
			if (typeof memory[FunctionName[0]] !== 'object')
				throw new Failure({
					name: 'TypeFailure',
					message: `expected class, found ${typeof memory[
						FunctionName[0]
					]}`,
				});

			if (
				typeof memory[FunctionName[0]]?.value?.[FunctionName[1]] !==
				'object'
			)
				throw new Failure({
					name: 'MethodFailure',
					message: `method ${FunctionName[1]} not found in this class`,
				});

			const { value, arguments } =
				memory[FunctionName[0]]?.value?.[FunctionName[1]];

			for (const argument of arguments) {
				const [providedArgument, funcArgument] = [
					FunctionArguments[arguments.indexOf(argument)],
					argument,
				];

				const argumentPosition = FunctionArguments.indexOf(
					FunctionArguments[arguments.indexOf(argument)]
				);
				if (FunctionArguments[argumentPosition])
					FunctionArguments[argumentPosition] = providedArgument;

				memory[funcArgument] = {
					value:
						providedArgument || memory[funcArgument]?.value || nil,
					mutable: false,
				};
			}

			return value(...FunctionArguments);
		} else {
			if (typeof memory[FunctionName[0]]?.value === 'object') {
				const value = memory[FunctionName[0]]?.value;
				const object = {};

				for (const field of global.Object.keys(value)) {
					object[field] =
						FunctionArguments[
							global.Object.keys(value).indexOf(field)
						] || value[field];
					memory[field] = {
						value:
							FunctionArguments[
								global.Object.keys(value).indexOf(field)
							] || value[field],
						mutable: false,
					};
				}
			}

			const { value, arguments } = memory[FunctionName[0]];

			for (const argument of arguments) {
				const [providedArgument, funcArgument] = [
					FunctionArguments[arguments.indexOf(argument)],
					argument,
				];

				const argumentPosition = FunctionArguments.indexOf(
					FunctionArguments[arguments.indexOf(argument)]
				);
				if (FunctionArguments[argumentPosition])
					FunctionArguments[argumentPosition] = providedArgument;
				memory[funcArgument] = {
					value: providedArgument || nil,
					mutable: false,
				};
			}

			if (typeof value !== 'function' && !global.Object.keys(value))
				throw new Failure({
					name: 'MethodFailure',
					message: 'this class is not callable',
				});

			if (typeof value === 'object') return value;
			return value(...FunctionArguments);
		}
	} else if (/"(.*)"/g.test(raw)) return raw.slice(1, -1);
	else if (/[0-9]/g.test(raw)) return Number(raw);
	else if (typeof memory[raw] !== 'undefined' && convertVariables)
		return memory[raw]?.value;
	else if (raw && convertVariables)
		throw new Failure({
			name: 'TypeFailure',
			message: `found variable/line with unknown type ${raw}`,
		});
	else return raw;
}

function asBool(value) {
	return Boolean(memory[value]?.value) || typeConvert(value, false);
}

module.exports = {
	is_module,
	wait,
	print_progress,
	removeIndents,
	typeConvert,
	asBool,
};
