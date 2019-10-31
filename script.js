var express = require("express");
var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/python");

var xhr = new XMLHttpRequest();
var url = "https://api.jdoodle.com/v1/execute";
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function sub() {
if (xhr.statusCode === 200) {
    var json = JSON.parse(xhr.responseText);
    console.log(json.output);
}
};
var data = JSON.stringify({
"script" : editor.getValue(),
"language" : "python2",
"versionIndex" : "0",
"clientId" : "55b38b73c23c3a81677bd5d26c97a403",
"clientSecret" : "6d891bf44cbf04fb235a3ef62e8a3a7f10f842e64e9ccd27fd435c85891e6e73"
});
xhr.send(data);
