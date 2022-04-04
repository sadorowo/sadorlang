export const FUNCTION_EXEC_REGEX = new RegExp('([a-z]|[A-Z])(*)');
export const TYPE_VARIABLE_REGEX = new RegExp('def val ([a-z]|[A-Z]) = (.*)');
export const USING_VARIABLE_REGEX = new RegExp('$([a-z]|[A-Z])');

export default { 
    FUNCTION_EXEC_REGEX, 
    TYPE_VARIABLE_REGEX,
    USING_VARIABLE_REGEX
}