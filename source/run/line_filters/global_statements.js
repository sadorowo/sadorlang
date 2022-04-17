const { Failure } = require('../../util/globals');
const { readFileSync } = require('fs');
const { run } = require('..');
const { join } = require('path');
const Helpers = require('../../util/helpers');

require('../../util/global_variables');
module.exports = function (line) {
    if (Helpers.removeIndents(line).startsWith('#')) return;
    
    // TODO: new statements
}