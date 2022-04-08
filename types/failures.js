const { nil } = require('../types/globals');

module.exports = class Failure extends Error {
    constructor(name, message) {
        super(message.replace(/undefined|null|NaN/g, nil))
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
