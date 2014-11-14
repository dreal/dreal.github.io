/*
dReal-smt2 Mode + Highlighter
Author: Jichao Sun
*/

define('ace/mode/dreal', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text', 'ace/mode/dreal_highlight_rules', 'ace/mode/matching_brace_outdent', 'ace/range'], function(require, exports, module) {


var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var Range = require("../range").Range;
var dRealHighlightRules = require("./dreal_highlight_rules").dRealHighlightRules;

var Mode = function() {
    this.HighlightRules = dRealHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
};
oop.inherits(Mode, TextMode);

(function() {
    this.getNextLineIndent = function(state, line, tab) {
        return this.$getIndent(line);
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };
    this.$id = "ace/mode/dreal";
}).call(Mode.prototype);

exports.Mode = Mode;
});
define('ace/mode/dreal_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) {

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var dRealHighlightRules = function() {

    var keywords = (
        "assert|check-sat|declare-fun|define-ode|exit|forall_t|Int|Real|set-logic"
    );

    var builtinConstants = ("d/dt");

    var keywordMapper = this.createKeywordMapper({
        "keyword": keywords,
        "constant.language": builtinConstants,
    }, "identifier");

    var decimalInteger = "[-]?(?:[0-9]+(\\.[0-9]+)?)";

    this.$rules = {
        "start" : [
            {
                token : "constant.numeric", // integer
                regex : decimalInteger + "\\b"
            },
            {
                token : keywordMapper,
                regex : "[a-zA-Z_$][-/a-zA-Z0-9_$]*\\b"
            },
            {
                token : "keyword.operator",
                regex : "\\+\\.|\\-\\.|\\*\\.|\\/\\.|#|;;|\\+|\\-|\\*|\\*\\*\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|<-|=|d/dt"
            },
            {
                token : "paren.lparen",
                regex : "[[({]"
            },
            {
                token : "paren.rparen",
                regex : "[\\])}]"
            },
            {
                token : "text",
                regex : "\\s+"
            }
        ],
    };
};

oop.inherits(dRealHighlightRules, TextHighlightRules);

exports.dRealHighlightRules = dRealHighlightRules;
});

define('ace/mode/matching_brace_outdent', ['require', 'exports', 'module' , 'ace/range'], function(require, exports, module) {


var Range = require("../range").Range;

var MatchingBraceOutdent = function() {};

(function() {

    this.checkOutdent = function(line, input) {
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\}/.test(input);
    };

    this.autoOutdent = function(doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({row: row, column: column});

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
        return line.match(/^\s*/)[0];
    };

}).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;
});
