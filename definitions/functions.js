const { generate, generateFunction } = require('../ui/generator');

module.exports = function (node) {
	switch (node.type) {
		case 'functionDefinition': {
			const functionName = node.functionName.value;
			return generateFunction(
				node.body.statements,
				node.parameters,
				functionName
			);
		}

		case 'boundFunctionDefinition': {
			const boundFunctionName = node.boundFunctionName.value;
			return generateFunction(
				[
					{
						type: 'functionCall',
						functionName: {
							type: 'identifier',
							value: node.targetFunction.functionName.value,
							text: node.targetFunction.functionName.value
						},
						parameters: node.targetFunction.parameters
					}
				],
				node.boundFunctionParameters,
				boundFunctionName
			);
		}

		case 'codeBlock':
			return generateFunction(node.statements, node.parameters);
		case 'arrayLiteral':
			return `[${node.items.map(generate).join(', ')}]`;
		case 'setLiteral':
			return `new Set([${node.items.map(generate).join(', ')}])`;
		case 'dictLiteral': {
			const entries = node.entries
				.map((entry) => {
					const [key, value] = entry;

					const keyExpression = generate(key);
					const valueExpression = generate(value);

					return `['${keyExpression}', '${valueExpression}']`;
				})
				.join(', ');
			return `new Map([${entries}])`;
		}
	}
};