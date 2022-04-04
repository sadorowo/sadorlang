export class Failure extends Error {
    public constructor() {

    }

    public GetStack() {
        return this.stack
    }
}