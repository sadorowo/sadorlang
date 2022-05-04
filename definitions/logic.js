const { generate, generateFunction } = require('../ui/generator');

module.exports = function (node) {
	switch (node.type) {
		case 'ifStatement': {
			const conditional = generate(node.conditional);
			const ifStatement = [
				`_if(${conditional}, `,
				`${generateFunction(node.consequent.statements, [])},`,
				`${generateFunction(node.alternate.statements, [])})`,
			].join('');
            
			return ifStatement;
		}
	}
};
