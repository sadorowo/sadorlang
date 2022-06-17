function length(arr) {
    return arr.length;
}

function _if(c, then, _else) {
    if (c) return then();
    else return _else();
}

function all(...statements) {
    return !statements.some((s) => !s)
}

function or(...statements) {
    return statements.some((s) => s)
}

function repl(str, from, to) {
    return str.replaceAll(from, to)
}

function split(str, splitter) {
    return str.split(splitter)
}

function replAll(str, kvp) {
    Array.from(kvp.entries()).forEach(([k, v]) => { str = str.replaceAll(k, v) })
    return str
}

function fmt(str, ...variables) {
    for (const index in variables) {
        str = str.replace(`$${index}`, variables[index])
    }

    return String(str)
}

function printf(str, ...variables) {
    return console.log(fmt(str, ...variables).replaceAll('\\n', '\n'))
}

function print(...text) {
    return console.log(...text.map((v) => v.replaceAll('\\n', '\n')))
}