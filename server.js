var express = require('express');
var app = express();
var request = require('request');
const path = require("path");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var routes = express.Router();

var url = "https://api.jdoodle.com/v1/execute";

 var obj = {
    "script" : "print(1234)",
    "language" : "python2",
    "versionIndex" : "0",
    "clientId" : "55b38b73c23c3a81677bd5d26c97a403",
    "clientSecret" : "6d891bf44cbf04fb235a3ef62e8a3a7f10f842e64e9ccd27fd435c85891e6e73"
    };
    //console.log(obj.script);
request.post({
    url: url,
    headers: {'content-type' : 'application/json'},
    body: obj,
    json: true,
  },
function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log("FLAG1");
        console.log(body);
        console.log("FLAG2");
    }else{
       console.log(body);
     //console.log(response);
        console.log("FAILED");
    }
}
);

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.post('/code', function(req,res){
    var xhr = new XMLHttpRequest();



    var data = JSON.stringify({
        "script" : "print(1234)",
        "language" : "python2",
        "versionIndex" : "0",
        "clientId" : "55b38b73c23c3a81677bd5d26c97a403",
        "clientSecret" : "6d891bf44cbf04fb235a3ef62e8a3a7f10f842e64e9ccd27fd435c85891e6e73"
        });
    

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function sub() {
    if (xhr.statusCode === 200) {
        var json = JSON.parse(xhr.responseText);
        res.json(json);
    }else{
        //console.log("--Flag1--");
        //console.log(xhr);
        //console.log("--Flag--");
        res.json({message: "not found"});
    }
    };
    
    xhr.send(data);
});



var server = app.listen(8081, () => {
 console.log("Page is running on: " + server.address().port);
}); 