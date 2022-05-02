const Failure = require('../runtime/failure');

module.exports = function ({ body }) {
    switch (body.type) {
        case 'assignment': {
            const [variable, newValue] = [body.variableName, body.value];

            if (variable.type !== 'identifier')
            throw new Failure(`expected identifier, found ${variable.type}`);

            if (!['identifier',
                'literal',
                'functionCall',
                'codeBlock'].includes(newValue.type))
            throw new Failure(`expected any of [identifier, literal, functionCall, codeBlock], found ${newValue.type}`);
            break
        }
    }
}