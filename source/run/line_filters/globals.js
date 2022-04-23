const { Failure } = require('../../util/globals');
const { readFileSync } = require('fs');
const { join } = require('path');
const { run } = require('..');
const Helpers = require('../../util/helpers');

module.exports = function (_, line) {
    if (Helpers.removeIndents(line).startsWith('#')) return true;
    
    if (/^mod ([a-zA-Z]+)$/g.test(line)) {
        const [, Path] = line.matchAll(/^mod ([a-zA-Z]+)$/g).next()?.value

        if (!Helpers.is_module(Path)) 
        throw new Failure({ name: 'ModuleFailure', message: `module ${Path} not found, build using cfsl crmod [name]` })

        run(readFileSync(join(process.cwd(), Path, 'main.cfs'))
        .toString('utf-8')
        .trim()
        .replace(/\r\n/g, '\n\n')
        .split('\n'), false)
    } else return 0;
}