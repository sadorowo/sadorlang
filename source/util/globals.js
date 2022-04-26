module.exports.nil = nil = 'nil';

class Failure extends Error {
	constructor({ name = 'Failure', message = 'unknown error' }) {
		super(message.replace(/undefined|null|NaN/g, nil));
		this.name = name;
		this.stack = '';
	}
}

module.exports.Failure = Failure;
