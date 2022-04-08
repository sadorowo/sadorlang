const FUNCTION_EXEC_REGEX = /^\$([a-z]|[A-Z])(.*)$/g;
const TYPE_VARIABLE_REGEX = /^def val [a-zA-Z]+ = (.*)+$/g;
const MUTABLE_VARIABLE_REGEX = /^def mut val [a-zA-Z]+ = (.*)+$/g;
const REPLACING_VARIABLE_VALUE_REGEX = /^repl [a-zA-Z]+ > (.*)+$/g;
const TYPE_FUNCTION_REGEX = /^def fn ([a-zA-Z].*)\(.*\) {[^]*(.*)}$/gm;
const USING_VARIABLE_REGEX = /\$[a-zA-Z]+/g;
const COMMENT_REGEX = /^"""(.*)"""$/g;

module.exports = {
    FUNCTION_EXEC_REGEX,
    TYPE_VARIABLE_REGEX,
    MUTABLE_VARIABLE_REGEX,
    REPLACING_VARIABLE_VALUE_REGEX,
    TYPE_FUNCTION_REGEX,
    USING_VARIABLE_REGEX,
    COMMENT_REGEX
}