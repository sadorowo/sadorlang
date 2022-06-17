var imionaMeskie = undefined;
var imionaZenskie = undefined;
var imiona = shuffle(concat(imionaMeskie, imionaZenskie));
function jakieImie(imie) {
	return _if(incl(imionaMeskie, imie), function () {
		return "męskie";
	},function () {
		return "żeńskie";
	});
};
each(imiona, function (imie) {
	var typImienia = jakieImie(imie);
	return printf("$0 to imię $1", imie, typImienia);
});
module.exports = class Failure extends Error {
    constructor (message) {
        super(message);
        this.name = this.constructor.name;
        this.stack = null;
    }
};function sum(...i) {
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
}function get(map, key) {
    return map.get(key);
}

function set(map, key, value) {
    map.set(key, value);
}

function size(setOrMap) {
    return setOrMap.size;
}function mod(x, y) {
    return x % y;
}

function abs(n) {
    return Math.abs(n);
}

function pow(n, m) {
    return Math.pow(n, m);
}

function sqrt(x) {
    return Math.sqrt(x);
}

function sm(x, y) {
    return x < y;
}

function gt(x, y) {
    return x > y;
}

function eq(o1, o2) {
    return o1 === o2;
}

function add(...nums) {
    let total = nums[0];

    for (let i = 1; i <= nums.length; ++i) {
        if (!isNaN(nums[i])) total += nums[i];
    }

    return total;
}

function subst(...nums) {
    let total = nums[0];

    for (let i = 1; i <= nums.length; ++i) {
        if (!isNaN(nums[i])) total -= nums[i];
    }

    return total;
}

function mult(...nums) {
    let total = nums[0];

    for (let i = 1; i <= nums.length; ++i) {
        if (!isNaN(nums[i])) total *= nums[i];
    }

    return total;
}

function div(...nums) {
    let total = nums[0];

    for (let i = 1; i <= nums.length; ++i) {
        if (!isNaN(nums[i])) total /= nums[i];
    }

    return total;
}

function fixed(int, digits = undefined) {
    return !isNaN(int) ? Number(int).toFixed(digits) : int
}function length(arr) {
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
    return console.log(fmt(str, ...variables).replaceAll('\\n', '\n'))
}

function print(...text) {
    return console.log(...text.map((v) => v.replaceAll('\\n', '\n')))
}