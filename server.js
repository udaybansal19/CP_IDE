var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser')
var socket = require('socket.io');
var mongo = require('mongodb').MongoClient;

var db_url = "mongodb://localhost:27017/";

var server = app.listen(8081, () => {
    console.log("Page is running on: " + server.address().port);
});

var io = socket(server);

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(express.json());       // to support JSON-encoded bodies


app.use(express.static('views'));


app.get('/', function(req,res) {
    res.sendFile('index.html')
});

app.post('/code', function(req,res){
    console.log(req.body.script);
    var url = "https://api.jdoodle.com/v1/execute";

    var obj = {
       "script" : req.body.script,
       "stdin" : req.body.stdin,
       "language" : req.body.language,
       "versionIndex" : req.body.vi,
       "clientId" : "55b38b73c23c3a81677bd5d26c97a403",
       "clientSecret" : "6d891bf44cbf04fb235a3ef62e8a3a7f10f842e64e9ccd27fd435c85891e6e73"
       };
   request.post({
       url: url,
       headers: {'content-type' : 'application/json'},
       body: obj,
       json: true,
     },
   function (error, response, body) {
       if (!error && response.statusCode == 200) {
        res.statusCode = 200;    
        res.json(body);

           console.log(body);
       }else{
        res.json({message: "not found"});
          console.log(body);
        //console.log(response);
           console.log("FAILED");
       }
   }
   );
});

app.get('/helloworld', function(req,res){
    mongo.connect(db_url,{ useUnifiedTopology: true }, function(err,db) {
        if (err) throw err;
        var dbo = db.db("editor-db");
        dbo.collection("helloWorld").findOne({'lang-code': req.header('lang-code')},function(err, result) {
          if (err) throw err;
          res.json(result);
          db.close();
        });
        res.statusCode = 200;
    })
});

io.on('connection', (socket) =>{

    console.log("connection made with " + socket.id);

    socket.on('typing', (data) => {
        io.sockets.emit('code',data);
        console.log(data);
    });
});


mongo.connect(db_url,{ useUnifiedTopology: true }, function(err,db) {
    if (err) throw err;
    var dbo = db.db("editor-db");
    dbo.collection("codes").find({},{ projection: { _id: 0, code: 0 } }).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      db.close();
    });
})