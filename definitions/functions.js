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