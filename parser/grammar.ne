@{%
    const customLexer = require("../lexer/lexer");
%}

@lexer customLexer

program
    -> statements
        {%
            (data) => ({
                type: "program",
                body: data[0]
            })
        %}

statements
    -> null
        {%
            () => []
        %}
    |  _ statement _
        {%
            (data) => [data[1]]
        %}
    |  _ statement _ "\n":+ statements
        {%
            (data) => [data[1], ...data[4]]
        %}
    |  _ %comment _

statement
    -> assignment          {% id %}
    |  overwriteAssignment {% id %}
    |  functionCall        {% id %}
    |  functionDefinition  {% id %}
    |  ifStatement         {% id %}
    |  %comment            {% id %}
    |  %identifier         {% id %}

assignment -> %identifier _ ":=" _ expression
    {%
        (data) => ({
            type: "assignment",
            variableName: data[0],
            value: data[4]
        })
    %}

overwriteAssignment -> %identifier _ ">" _ expression
    {%
        (data) => ({
            type: "overwriteAssignment",
            variableName: data[0],
            newValue: data[4]
        })
    %}

functionCall -> %identifier _ "(" _ expressionList _ ")"
    {%
        (data) => ({
            type: "functionCall",
            functionName: data[0],
            parameters: data[4]
        })
    %}

functionDefinition -> 
    "method" _ %identifier _ "(" _ expressionList _ ")"  _ codeBlockWParameters
    {%
        (data) => ({
            type: "functionDefinition",
            functionName: data[2],
            parameters: data[6],
            body: data[10]
        })
    %}
    
codeBlock
    -> codeBlockWParameters     {% id %}
    |  "{" _ codeBlockParameters _ "\n" statements "\n" _ "}"
        {%
            (data) => ({
                type: "codeBlock",
                parameters: data[2],
                statements: data[5]
            })
        %}

codeBlockWParameters
    -> "{" _ "\n" statements "\n" _ "}"
        {%
            (data) => ({
                type: "codeBlock",
                statements: data[3]
            })
        %}

codeBlockParameters
    -> "|" _ expressionList _ "|"
        {%
            (data) => data[2]
        %}

expressionList
    -> expression
        {%
            (data) => [data[0]]
        %}
    |  expression __ expressionList
        {%
            (data) => [data[0], ...data[2]]
        %}

expression
    -> %identifier    {% id %}
    |  literal        {% id %}
    |  functionCall  {% id %}
    |  codeBlock     {% id %}

literal
    -> %number                   {% id %}
    |  %string                   {% id %}
    |  emptyCollectionLiteral  {% id %}
    |  seqLiteral          {% id %}
    |  dictLiteral        {% id %}
    |  %regex                    {% id %}

seqLiteral
    -> optionalTag "{" _ expressionList _ "}"
        {%
            (data) => {
                const tag = data[0] || "array";
                if (tag === "dict")
                throw new Error("Tagged sequence as dict");

                return {
                    type: tag + "Literal",
                    items: data[3]
                }
            }
        %}

emptyCollectionLiteral
    -> optionalTag "{" _ "}"
        {%
            (data) => {
                const tag = data[0] || "array";
                if (tag === "dict") return {
                    type: "dictLiteral",
                    entries: []
                }; else return {
                    type: `${tag}Literal`,
                    items: []
                }
            }
        %}

dictLiteral
    -> optionalTag "{" _ kvPairList _ "}"
        {%
            (data) => {
                const tag = data[0] || "dict";
                if (tag !== "dict")
                throw new Error(`Tagged dict as ${tag}`);

                return {
                    type: "dictLiteral",
                    entries: data[3]
                };
            }
        %}

kvPairList
    -> kvPair
        {%
            (data) => [data[0]]
        %}
    |  kvPair __ kvPairList
        {%
            (data) => [data[0], ...data[2]]
        %}

kvPair
    -> expression _ ":" _ expression
        {%
            (data) => [data[0], data[4]]
        %}

optionalTag
    -> null {% () => null %}
    |  tag  {% id %}

tag ->
    "{" tagName "}"
    {%
        (data) => data[1].value
    %}

tagName
    -> "array"   {% id %}
    |  "dict"    {% id %}
    |  "set"     {% id %}

ifStatement
    -> "if" __ expression MLWS codeBlock MLWS "else" MLWS codeBlock
        {%
            (data) => ({
                type: "ifStatement",
                conditional: data[2],
                consequent: data[4],
                alternate: data[8]
            })
        %}

MLWS
    -> MLWSC
    |  MLWSC MLWS

MLWSC
    -> __
    |  %newline

_ 
    -> null
    |  __

__ -> %whitespace