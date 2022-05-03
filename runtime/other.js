function length(arr) {
    return arr.length;
}

function _if(c, then, _else) {
    if (c) return then();
    else return _else();
}

function print(...text) {
    return console.log(...text)
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