const { readdirSync } = require('fs');
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

function typeConvert(raw) {
    if (/"(.*)"/g.test(raw)) return raw.slice(1, -1)
    else if (/[0-9]/g.test(raw)) return Number(raw)
    else if (/([^.",]+)/g.test(raw)) return raw.match(/([^.",]+)/g).slice(1, -1).filter((v) => v.trim());
}

module.exports = { is_module, wait, print_progress, removeIndents, typeConvert }