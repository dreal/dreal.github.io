function add_content(str){
    $('#output').append(str);
}
var socket = io.connect("http://gauss.modck.cs.cmu.edu:8080/");

socket.on('message', function(data) {
    add_content(data);
    $(document).scrollTop($(document).height());
});

function verbose(){
    var button = $("#verbose");
    if (button.hasClass("active")){
        button.removeClass("active");
    }
    else{
        button.addClass("active");
    }
}

function solve(){
    document.getElementById('output').innerHTML = "";
    var code = String(editor.session.doc.getAllLines()).replace(/\,/g,"\n");
    var precision = document.getElementById('precision');
    if(precision.value){
        precision = precision.value;
    }
    else{
        precision = 0.001;
    }
    if ($("#verbose").hasClass("active")){
        var verbose = " --verbose";
    }
    else{
        var verbose = "";
    }
    var out = document.getElementById("output")
    out.className = 'unhidden';
    socket.emit('solveRequest', code, precision, verbose);
}

var editor = ace.edit("editor");
var code = "(set-logic QF_NRA)\n(declare-fun x1 () Real)\n(declare-fun x2 () Real)\n(assert (<= 3.0 x1))\n(assert (<= x1 3.14))\n(assert (<= -7.0 x2))\n(assert (<= x2 5.0))\n(assert (<= (- (* 2.0 3.14159265) (* 2.0 (* x1 (arcsin (* (cos 0.797) (sin (/ 3.14159265 x1)))))))\n(+ (- 0.591 (* 0.0331 x2)) (+ 0.506 1.0))))\n(check-sat)\n(exit)"

ace.config.set("basePath", "/try/ace-builds/src");
editor.setTheme("ace/theme/chrome");
editor.getSession().setMode("ace/mode/dreal");
editor.insert(code);
editor.getSession().setUseWrapMode(true);
editor.setShowPrintMargin(false);
socket.on('connect', function(){
    document.getElementById("ServerStatus").src="http://img.shields.io/badge/Server%20Status-On-brightgreen.svg";
});
socket.on('disconnect', function(){
    document.getElementById("ServerStatus").src="http://img.shields.io/badge/Server%20Status-Off-red.svg";
});
