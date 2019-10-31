var express = require('express');
var app = express();
const path = require("path");

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

var server = app.listen(8081, () => {
 console.log("Page is running on: " + server.address().port);
}); 