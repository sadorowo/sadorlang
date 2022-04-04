module.exports.nil = 'nil';

globalThis['__sadorlang'] = {}
globalThis['__sadorlang']['Println'] = function (...text) {
    console.log(...text)
}