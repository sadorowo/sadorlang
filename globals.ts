export const nil = 'nil';

globalThis['__sadorlang']['Println'] = function (...text: string[]) {
    process.stdout.write(...text)
}
