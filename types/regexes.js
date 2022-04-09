const FUNCTION_EXEC_REGEX = /^\$([a-z]|[A-Z].*)\((.*)\)$/g;
const TYPE_VARIABLE_REGEX = /^def val [a-zA-Z]+ = ([a-zA-Z0-9].*)+$/g;
const TYPE_FUNCTION_VARIABLE_REGEX = /^def val [a-zA-Z]+ = \$([a-z]|[A-Z])(.*)$/g;
const MUTABLE_FUNCTION_VARIABLE_REGEX = /^def mut val [a-zA-Z]+ = \$([a-z]|[A-Z])(.*)$/g;
const MUTABLE_VARIABLE_REGEX = /^def mut val [a-zA-Z]+ = (.*)+$/g;
const REPLACING_VARIABLE_VALUE_REGEX = /^repl [a-zA-Z]+ > (.*)+$/g;
const TYPE_FUNCTION_REGEX = /^def fn ([a-zA-Z].*)\(.*\) {[^]*(.*)}$/gm;
const USING_VARIABLE_REGEX = /\$[a-zA-Z]+/g;
const COMMENT_REGEX = /^"""(.*)"""$/g;

const FUNC_DEF_START = /^def fn ([a-zA-Z].*)\(.*\) {$/g;
const FUNC_DEF_END = /^}$/g;

module.exports = {
    FUNCTION_EXEC_REGEX,
    TYPE_VARIABLE_REGEX,
    MUTABLE_VARIABLE_REGEX,
    REPLACING_VARIABLE_VALUE_REGEX,
    TYPE_FUNCTION_REGEX,
    USING_VARIABLE_REGEX,
    COMMENT_REGEX,
    FUNC_DEF_START,
    FUNC_DEF_END,
    TYPE_FUNCTION_VARIABLE_REGEX,
    MUTABLE_FUNCTION_VARIABLE_REGEX
}