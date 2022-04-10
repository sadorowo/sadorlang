const FUNCTION_EXEC_REGEX = /^\$([a-zA-Z]+)\((.*)\)$/g;
const TYPE_VARIABLE_REGEX = /^def val [a-zA-Z]+ = (\"([a-zA-Z0-9].*)\"|{(\s)*("[a-zA-Z0-9].*")(\s)*})+$/g;
const TYPE_FUNCTION_VARIABLE_REGEX = /^def val [a-zA-Z]+ = \$([a-zA-Z])(.*)$/g;
const MUTABLE_FUNCTION_VARIABLE_REGEX = /^def mut val [a-zA-Z]+ = \$([a-zA-Z])(.*)$/g;
const MUTABLE_VARIABLE_REGEX = /^def mut val [a-zA-Z]+ = (.*)+$/g;
const REPLACING_VARIABLE_VALUE_REGEX = /^repl [a-zA-Z]+ > (.*)+$/g;
const TYPE_FUNCTION_REGEX = /^def fn ([a-zA-Z].*)\(.*\) {[^]*(.*)}$/gm;
const USING_VARIABLE_REGEX = /\$[a-zA-Z]+/g;
const COMMENT_REGEX = /^"""(.*)"""$/g;

const FUNC_DEF_START = /^def fn ([a-zA-Z].*)\(.*\) {$/g;
const FUNC_DEF_END = /^}$/g;

const EVERY_FUNC_DEF_START = /^every ([0-9]+) {$/g;
const EVERY_FUNC_DEF_END = /^}$/g;

const EACH_LOOP_START = /^each \(([a-zA-Z]+) % ([a-zA-Z]+)\) {$/g;
const EACH_LOOP_END = /^}$/g;

const STRING_TYPE = /\"(.*)\"/g;
const NUMBER_TYPE = /^-?\d+(\.\d+)?$/g;
const LIST_TYPE = /{(\s)*("[a-zA-Z0-9].*")(\s)*}/g;

const PARENTHESES_CONTENT = /.*\((.*)\)/g;
const RAW_LIST_TYPE = /\[(.*)\]/g;

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
    MUTABLE_FUNCTION_VARIABLE_REGEX,
    EVERY_FUNC_DEF_START,
    EVERY_FUNC_DEF_END,
    EACH_LOOP_START,
    EACH_LOOP_END,
    RAW_LIST_TYPE
}

module.exports.TYPES = { STRING_TYPE, /*NUMBER_TYPE,*/ PARENTHESES_CONTENT, LIST_TYPE }