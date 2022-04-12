const { readdirSync, mkdirSync, writeFileSync } = require('fs');
const { wait, print_progress } = require('../util/helpers');
const { Failure } = require('../util/globals');
const { join } = require('path');

const modName = process.argv[3].trim();

async function main() {
    if (!modName)
        throw new Failure({ name: 'ArgumentFailure', message: 'module name is nil' })

    if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(modName))
        throw new Failure({ name: 'ArgumentFailure', message: 'module name cannot be accepted' })

    const files = readdirSync('.');
    if (files.includes(modName))
        throw new Failure({ name: 'OverwriteFailure', message: 'module with this name already exists' })

    const desc = `creating module ${modName}...`;
    print_progress(desc, 0);

    await wait(1500);

    try {
        mkdirSync(join(process.cwd(), modName));

        console.clear();
        print_progress(desc, 50);

        writeFileSync(join(process.cwd(), modName, 'mod.yaml'), 'name:' +
        `\n   - ${modName}` +
        '\ncreation_date:' +
        `\n   - ${new Date().toISOString()}` +
        '\ncreation_date_raw:' +
        `\n   - ${Date.now()}\n\n` +
        '# generated with [sl crmod], \n' +
        '# sadorlang util to create modules', { encoding: 'utf-8' })

        console.clear();
        print_progress(desc, 75);

        writeFileSync(join(process.cwd(), modName, 'main.sl'), '# This is your new module. You can now modify this file!', { encoding: 'utf-8' })

        console.clear();
        print_progress('successfully created new module', 100);
    } catch {
        console.clear();
        print_progress('an error occured when creating module, stopping', 0);
        process.exit(0);
    }
}

main()