const { runtime, generate } = require('../ui/generator');

module.exports = function (node) {
    switch (node.type) {
        case 'compiled': 
        return node.body.map(generate).join(';\n') + ';\n' + runtime;

        case 'constAssignment': {
            const varName = node.variableName.value;
	    	const value = generate(node.value);

		    return `const ${varName} = ${value}`;
        }

        case 'assignment': {
            const varName = node.variableName.value;
	    	const value = generate(node.value);

		    return `var ${varName} = ${value}`;
        }

        case 'overwriteAssignment': {
            const varName = node.variableName.value;
	    	const newValue = generate(node.newValue);

		    return `${varName} = ${newValue}`;
        }

        case 'returnStatement': {
            return `return ${generate(node.returned)}`
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