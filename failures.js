const { nil } = require('./globals');

module.exports = class Failure extends Error {
    constructor(name, message) {
        super(message)
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
