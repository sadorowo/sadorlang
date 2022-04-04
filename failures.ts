import { nil } from "./globals";

export class Failure extends Error {
    public constructor(public name: string, public message: string) {}

    public GetStack() {
        return this.stack || nil
    }

    public GetName() {
        return this.name
    }
}
