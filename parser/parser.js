const grammar = require('./grammar.js');
const nearley = require('nearley');

module.exports = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));