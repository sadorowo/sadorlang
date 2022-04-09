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
        console.log(...text)
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

__slGlobalThis['Randint'] = {
    __value: function (min, max) {
        if (isNaN(min) || isNaN(max)) throw new Failure('ConverterFailure', 'cannot convert string to integer')

        return Math.floor(Math.random() * (max - min) + min)
    }, __functionParameters: ['min', 'max'], __ismut: false
}