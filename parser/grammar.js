// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    const customLexer = require("../lexer/lexer");
var grammar = {
    Lexer: customLexer,
    ParserRules: [
    {"name": "program", "symbols": ["statements"], "postprocess": 
        (data) => ({
            type: "program",
            body: data[0]
        })
                },
    {"name": "statements", "symbols": [], "postprocess": 
        () => []
                },
    {"name": "statements", "symbols": ["_", "statement", "_"], "postprocess": 
        (data) => [data[1]]
                },
    {"name": "statements$ebnf$1", "symbols": [{"literal":"\n"}]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", {"literal":"\n"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["_", "statement", "_", "statements$ebnf$1", "statements"], "postprocess": 
        (data) => [data[1], ...data[4]]
                },
    {"name": "statements", "symbols": ["_", (customLexer.has("comment") ? {type: "comment"} : comment), "_"]},
    {"name": "statement", "symbols": ["assignment"], "postprocess": id},
    {"name": "statement", "symbols": ["functionCall"], "postprocess": id},
    {"name": "statement", "symbols": ["functionDefinition"], "postprocess": id},
    {"name": "statement", "symbols": ["ifStatement"], "postprocess": id},
    {"name": "statement", "symbols": [(customLexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "statement", "symbols": [(customLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "assignment", "symbols": [(customLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":":="}, "_", "expression"], "postprocess": 
        (data) => ({
            type: "assignment",
            variableName: data[0],
            value: data[4]
        })
            },
    {"name": "functionCall", "symbols": [(customLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "expressionList", "_", {"literal":")"}], "postprocess": 
        (data) => ({
            type: "functionCall",
            functionName: data[0],
            parameters: data[4]
        })
            },
    {"name": "functionDefinition", "symbols": [{"literal":"method"}, "_", (customLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "expressionList", "_", {"literal":")"}, "_", "codeBlockWParameters"], "postprocess": 
        (data) => ({
            type: "functionDefinition",
            functionName: data[2],
            parameters: data[6],
            body: data[10]
        })
            },
    {"name": "codeBlock", "symbols": ["codeBlockWParameters"], "postprocess": id},
    {"name": "codeBlock", "symbols": [{"literal":"{"}, "_", "codeBlockParameters", "_", {"literal":"\n"}, "statements", {"literal":"\n"}, "_", {"literal":"}"}], "postprocess": 
        (data) => ({
            type: "codeBlock",
            parameters: data[2],
            statements: data[5]
        })
                },
    {"name": "codeBlockWParameters", "symbols": [{"literal":"{"}, "_", {"literal":"\n"}, "statements", {"literal":"\n"}, "_", {"literal":"}"}], "postprocess": 
        (data) => ({
            type: "codeBlock",
            statements: data[3]
        })
                },
    {"name": "codeBlockParameters", "symbols": [{"literal":"|"}, "_", "expressionList", "_", {"literal":"|"}], "postprocess": 
        (data) => data[2]
                },
    {"name": "expressionList", "symbols": ["expression"], "postprocess": 
        (data) => [data[0]]
                },
    {"name": "expressionList", "symbols": ["expression", "__", "expressionList"], "postprocess": 
        (data) => [data[0], ...data[2]]
                },
    {"name": "expression", "symbols": [(customLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expression", "symbols": ["literal"], "postprocess": id},
    {"name": "expression", "symbols": ["functionCall"], "postprocess": id},
    {"name": "expression", "symbols": ["codeBlock"], "postprocess": id},
    {"name": "literal", "symbols": [(customLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "literal", "symbols": [(customLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "literal", "symbols": ["emptyCollectionLiteral"], "postprocess": id},
    {"name": "literal", "symbols": ["seqLiteral"], "postprocess": id},
    {"name": "literal", "symbols": ["dictLiteral"], "postprocess": id},
    {"name": "literal", "symbols": [(customLexer.has("regex") ? {type: "regex"} : regex)], "postprocess": id},
    {"name": "seqLiteral", "symbols": ["optionalTag", {"literal":"{"}, "_", "expressionList", "_", {"literal":"}"}], "postprocess": 
        (data) => {
            const tag = data[0] || "array";
            if (tag === "dict")
            throw new Error("Tagged sequence as dict");
        
            return {
                type: tag + "Literal",
                items: data[3]
            }
        }
                },
    {"name": "emptyCollectionLiteral", "symbols": ["optionalTag", {"literal":"{"}, "_", {"literal":"}"}], "postprocess": 
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
                },
    {"name": "dictLiteral", "symbols": ["optionalTag", {"literal":"{"}, "_", "kvPairList", "_", {"literal":"}"}], "postprocess": 
        (data) => {
            const tag = data[0] || "dict";
            if (tag !== "dict")
            throw new Error(`Tagged dict as ${tag}`);
        
            return {
                type: "dictLiteral",
                entries: data[3]
            };
        }
                },
    {"name": "kvPairList", "symbols": ["kvPair"], "postprocess": 
        (data) => [data[0]]
                },
    {"name": "kvPairList", "symbols": ["kvPair", "__", "kvPairList"], "postprocess": 
        (data) => [data[0], ...data[2]]
                },
    {"name": "kvPair", "symbols": ["expression", "_", {"literal":":"}, "_", "expression"], "postprocess": 
        (data) => [data[0], data[4]]
                },
    {"name": "optionalTag", "symbols": [], "postprocess": () => null},
    {"name": "optionalTag", "symbols": ["tag"], "postprocess": id},
    {"name": "tag", "symbols": [{"literal":"{"}, "tagName", {"literal":"}"}], "postprocess": 
        (data) => data[1].value
            },
    {"name": "tagName", "symbols": [{"literal":"array"}], "postprocess": id},
    {"name": "tagName", "symbols": [{"literal":"dict"}], "postprocess": id},
    {"name": "tagName", "symbols": [{"literal":"set"}], "postprocess": id},
    {"name": "ifStatement", "symbols": [{"literal":"if"}, "__", "expression", "MLWS", "codeBlock", "MLWS", {"literal":"else"}, "MLWS", "codeBlock"], "postprocess": 
        (data) => ({
            type: "ifStatement",
            conditional: data[2],
            consequent: data[4],
            alternate: data[8]
        })
                },
    {"name": "MLWS", "symbols": ["MLWSC"]},
    {"name": "MLWS", "symbols": ["MLWSC", "MLWS"]},
    {"name": "MLWSC", "symbols": ["__"]},
    {"name": "MLWSC", "symbols": [(customLexer.has("newline") ? {type: "newline"} : newline)]},
    {"name": "_", "symbols": []},
    {"name": "_", "symbols": ["__"]},
    {"name": "__", "symbols": [(customLexer.has("whitespace") ? {type: "whitespace"} : whitespace)]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
