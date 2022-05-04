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

function replAll(str, kvp) {
    console.log(kvp)
    Array.from(kvp.entries()).forEach(([k, v]) => { str = str.replaceAll(k, v) })
    return str
}

function fmt(str, ...variables) {
    for (const index in variables) {
        str = str.replace(`$${index}`, variables[index])
    }

    return str
}

function printf(str, ...variables) {
    return console.log(fmt(str, ...variables))
}

function print(...text) {
    return console.log(...text)
}