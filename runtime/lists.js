function sum(...i) {
    return i.reduce((sum, num) => sum + num, 0);
}

function join(arr, sep) {
    return arr.join(sep);
}

function at(arr, index) {
    return arr[index];
}

function each(arr, fn) {
    return arr.forEach(fn);
}

function map(arr, fun) {
    return arr.map(fun);
}

function filter(arr, fun) {
    return arr.filter(fun);
}

function reduce(arr, fun, initValue) {
    return arr.reduce(fun, initValue);
}

function entries(map) {
    return Array.from(map.entries());
}

function concat(...arrays) {
    return new Array().concat(...arrays)
}

function incl(array, item) {
    return array.indexOf(item) !== -1
}

function shuffle(array) {
    return array.map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

function random(array) {
    return array[Math.floor(Math.random() * array.length)]
}