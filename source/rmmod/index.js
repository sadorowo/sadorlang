const { wait, print_progress } = require('../util/helpers');
const { Failure } = require('../util/globals');
const { readdirSync, rmSync } = require('fs');
const { join } = require('path');

const modName = process.argv[3].trim();

async function main() {
	if (!modName)
		throw new Failure({
			name: 'ArgumentFailure',
			message: 'module name is nil',
		});

	if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(modName))
		throw new Failure({
			name: 'ArgumentFailure',
			message: 'module name cannot be accepted',
		});

	const files = readdirSync('.');
	if (!files.includes(modName))
		throw new Failure({
			name: 'SearchFailure',
			message: 'cannot find module with this name',
		});

	const moduleFiles = readdirSync(join('.', modName));
	if (['mod.yaml', 'main.sl'].some((item) => !moduleFiles.includes(item)))
		throw new Failure({
			name: 'StructureFailure',
			message: 'this directory is not a module',
		});

	const desc = `deleting module ${modName}...`;
	print_progress(desc, 0);

	await wait(1500);

	try {
		console.clear();
		print_progress(desc, 50);

		rmSync(join(process.cwd(), modName), { recursive: true, force: true });
		console.clear();
		print_progress('successfully deleted this module', 100);
	} catch {
		console.clear();
		print_progress('an error occured when deleting module, stopping', 0);
		process.exit(0);
	}
}

main();
