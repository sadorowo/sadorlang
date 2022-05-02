module.exports = class Failure extends Error {
    constructor (message) {
        super(message);
        this.stack = null;
    }
}