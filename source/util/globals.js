module.exports.nil = nil = 'nil';

class Failure extends Error {
    constructor({ name = 'Failure', message = 'unknown error' }) {
        super(message.replace(/undefined|null|NaN/g, nil))
        this.name = name 
        this.stack = '';
    }
}

class _Object {
    constructor(...fields) {
        this.fields = fields;
    }
}

module.exports.Failure = Failure;
module.exports.Object = _Object;