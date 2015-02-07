var http = require("http"); //library that listen request and respond to them

//creating express driven web application
var express = require('express'); //adding express dependency
var app = express(); //as its a singelton
app.set('view engine', 'vash');//setting up view engine
app.set('port', process.env.PORT || 3000); //setting up a port 
app.use(express.static(__dirname + '/public'));//loading static resources from public folder

var controllers = require('./controllers');
controllers.init(app);//Mapping the routes

//var server = http.createServer(app).listen(3000);//app will handle callback fun for request and response
//server.listen(3000);//listening at port

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.');
});