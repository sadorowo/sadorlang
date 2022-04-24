const { readFileSync } = require('fs');
const { Failure } = require('../../util/globals');
const { join } = require('path');
const { run } = require('..');
const Helpers = require('../../util/helpers');

module.exports = function (_, line) {
    if (Helpers.removeIndents(line).startsWith('#')) return;
    
    if (/^mod ([a-zA-Z]+)$/g.test(line)) {
        const [, Path] = line.matchAll(/^mod ([a-zA-Z]+)$/g).next()?.value

        if (!Helpers.is_module(Path)) 
        throw new Failure({ name: 'ModuleFailure', message: `module ${Path} not found, build using cfsl crmod [name]` })

        return run(readFileSync(join(process.cwd(), Path, 'main.cfs'))
        .toString('utf-8')
        .trim()
        .replace(/\r\n/g, '\n\n')
        .split('\n'), false)
    } else if (/^return (.*)$/g.test(line)) {
        const [, Object] = line.matchAll(/^return (.*)$/g).next()?.value

        return Helpers.typeConvert(Object)
    } else return 0;
}