module.exports = class Failure extends Error {
    constructor (message) {
        super(message);
        this.name = this.constructor.name;
        this.stack = null;
    }
};