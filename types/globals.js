module.exports.nil = 'nil';
globalThis['__slGlobalThis'] = {}

class Failure extends Error {
    constructor(name, message) {
        super(message.replace(/undefined|null|NaN/g, module.exports.nil))
        this.name = name;
        this.stack = '';
    }

    GetStack() {
        return this.stack || nil
    }

    GetName() {
        return this.name
    }
}

module.exports.Failure = Failure;

__slGlobalThis['Println'] = {
    __value: function (...text) {
        const formattedText = text.join(' ')
        console.log(formattedText.split(/\\n/g).join('\n'))
    }, __functionParameters: ['text'], __ismut: false
}

__slGlobalThis['Sum'] = {
    __value: function (...numbers) {
        if (numbers.some((number) => isNaN(number))) throw new Failure('ConverterFailure', 'cannot convert string to integer')
        return numbers.reduce((a, b) => parseInt(a) + parseInt(b))
    }, __functionParameters: ['numbers'], __ismut: false
}

__slGlobalThis['Capital'] = {
    __value: function (text) {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }, __functionParameters: ['text'], __ismut: false
}

__slGlobalThis['Lower'] = {
    __value: function (text) {
        return text.toLowerCase()
    }, __functionParameters: ['text'], __ismut: false
}

__slGlobalThis['Split'] = {
    __value: function (text, char) {
        return text.split(char)
    }, __functionParameters: ['text', 'char'], __ismut: false
}

__slGlobalThis['Randint'] = {
    __value: function (min, max) {
        if (isNaN(min) || isNaN(max)) throw new Failure('ConverterFailure', 'cannot convert string to integer')

        return Math.floor(Math.random() * (Number(max) - Number(min)) + Number(min))
    }, __functionParameters: ['min', 'max'], __ismut: false
}

__slGlobalThis['IndexOf'] = {
    __value: function (array, key) {
        if (!Array.isArray(array)) throw new Failure('TypeFailure', 'array argument must be a list');
        if (array.indexOf(key) === -1) throw new Failure('KeyFailure', `key ${key} not found in ${JSON.stringify(array)}`);

        return array.indexOf(key)
    }, __functionParameters: ['array', 'key'], __ismut: false
}

__slGlobalThis['ItemAt'] = {
    __value: function (array, index) {
        if (!Array.isArray(array)) throw new Failure('TypeFailure', 'array argument must be a list');

        return array[index]
    }, __functionParameters: ['array', 'index'], __ismut: false
}