module.exports.nil = 'nil';

globalThis['__sadorlang'] = {}

__sadorlang['Println'] = {
    __value: function (...text) {
        console.log(...text)
    }, __ismut: false
}