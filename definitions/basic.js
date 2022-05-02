const { runtime, generate } = require('../ui/generator');
const Failure = require('../runtime/failure');

module.exports = function (node) {
    switch (node.type) {
        case 'program': 
        return node.body.map(generate).join(';\n') + ';\n' + runtime;

        case 'assignment': {
            const varName = node.variableName.value;
	    	const value = generate(node.value);
		    return `var ${varName} = ${value}`;
        }

        case 'functionCall': {
            const sourceFunctionName = node.functionName.value;
	    	const functionName = sourceFunctionName === 'if' ? '_if' : sourceFunctionName;
		    const params = node.parameters.map(generate).join(', ');

		    return `${functionName}(${params})`;
        }

        case 'identifier': 
        case 'string': 
        case 'regex': return node.value;
        case 'number': return String(node.value);
    }
}