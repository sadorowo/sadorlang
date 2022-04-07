module.exports.FUNCTION_EXEC_REGEX = /\$([a-z]|[A-Z])(.*)/g;
module.exports.TYPE_VARIABLE_REGEX = /def val [a-zA-Z]+ = (.*)+/g;
module.exports.MUTABLE_VARIABLE_REGEX = /def mut val [a-zA-Z]+ = (.*)+/g;
module.exports.REPLACING_VARIABLE_VALUE_REGEX = /repl [a-zA-Z]+ > (.*)+/g;
module.exports.TYPE_FUNCTION_REGEX = /def fn ([a-zA-Z].*)\(.*\) {[^]*(.*)}/gm;
module.exports.USING_VARIABLE_REGEX = /\$[a-zA-Z]+/g;