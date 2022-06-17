@{%
    const customLexer = require("../lexer/lexer");
%}

@lexer customLexer

compiled
    -> statements
        {%
            (data) => ({
                type: "compiled",
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
    -> returnStatement     {% id %}
    |  boundFunctionDefinition {% id %}
    |  spreadOperator      {% id %}
    |  assignment          {% id %}
    |  constAssignment     {% id %}
    |  overwriteAssignment {% id %}
    |  asyncFunctionCall   {% id %}
    |  functionCall        {% id %}
    |  functionDefinition  {% id %}
    |  ifStatement         {% id %}
    |  %comment            {% id %}
    |  %identifier         {% id %}

constAssignment -> %identifier "!" _ ":=" _ expression
    {%
        (data) => ({
            type: "constAssignment",
            variableName: data[0],
            value: data[5]
        })
    %}

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

returnStatement -> "return" _ expression
    {%
        (data) => ({
            type: "returnStatement",
            returned: data[2]
        })
    %}

asyncFunctionCall -> "await" _ %identifier _ "(" _ expressionList _ ")"
    {%
        (data) => ({
            type: "asyncFunctionCall",
            functionName: data[2],
            parameters: data[6]
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
    
boundFunctionDefinition ->
    "bound" _ "method" _ %identifier _ "(" _ expressionList _ ")" _ functionCall
    {%
        (data) => ({
            type: "boundFunctionDefinition",
            boundFunctionName: data[4],
            boundFunctionParameters: data[8],
            targetFunction: data[12]
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
    -> "|" _ expressionList _ "|" _ %arrow
        {%
            (data) => data[2]
        %}

expressionList
    -> expression
        {%
            (data) => [data[0]]
        %}
    |  expression "," _ expressionList
        {%
            (data) => [data[0], ...data[3]]
        %}
    | _ {% (data) => [] %}

expression
    -> %identifier       {% id %}
    |  literal           {% id %}
    |  asyncFunctionCall {% id %}
    |  functionCall      {% id %}
    |  codeBlock         {% id %}

literal
    -> %number                  {% id %}
    |  %string                  {% id %}
    |  emptyCollectionLiteral   {% id %}
    |  seqLiteral               {% id %}
    |  dictLiteral              {% id %}
    |  %regex                   {% id %}

iterable
    -> emptyCollectionLiteral {% id %}
    |  seqLiteral {% id %}
    |  dictLiteral {% id %}

spreadOperator 
    -> iterable _ "..."
        {%
            (data) => {
                const iterable = data[0];
                if (!Array.isArray(iterable)) 
                throw new Error(`cannot convert ${typeof iterable} to iterable`)

                return {
                    type: "spreadOperator",
                    iterable: data[0]
                }
            }
        %}
    | functionCall _ "..."
        {%
            (data) => {
                const iterable = data[0];
                if (!Array.isArray(iterable)) 
                throw new Error(`cannot convert ${typeof iterable} to iterable`)

                return {
                    type: "spreadOperator",
                    iterable: data[0]
                }
            }
        %}

seqLiteral
    -> "{" _ expressionList _ "}" _ optionalTag
        {%
            (data) => {
                const tag = data[6] || "array";
                if (tag === "dict")
                throw new Error("cannot convert sequence to dict");

                return {
                    type: `${tag}Literal`,
                    items: data[2]
                }
            }
        %}

emptyCollectionLiteral
    -> "{" _ "}" _ optionalTag
        {%
            (data) => {
                const tag = data[4] || "array";
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
    -> "{" _ kvPairList _ "}" _ optionalTag
        {%
            (data) => {
                const tag = data[6] || "dict";
                if (tag !== "dict")
                throw new Error(`Tagged dict as ${tag}`);

                return {
                    type: "dictLiteral",
                    entries: data[2]
                };
            }
        %}

kvPairList
    -> kvPair
        {%
            (data) => [data[0]]
        %}
    |  kvPair _ "," _ kvPairList
        {%
            (data) => [data[0], ...data[4]]
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
    "as" _ tagName
    {%
        (data) => data[2].value
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