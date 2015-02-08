var http = require("http"); //library that listen request and respond to them

//creating express driven web application
var express = require('express'); //adding express dependency
var app = express(); //as its a singelton
app.set('view engine', 'vash');//setting up view engine
app.set('port', process.env.PORT || 3000); //setting up a port 
app.use(require('body-parser')()); // to enable req.body
app.use(express.static(__dirname + '/public'));//loading static resources from public folder

app.use(require('cookie-parser')());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    key: 'express.sid',
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));




var controllers = require('./controllers');
controllers.init(app);//Mapping the routes

//var server = http.createServer(app).listen(3000);//app will handle callback fun for request and response
//server.listen(3000);//listening at port

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.');
});

app.use(function (req, res, next) {
    var views = req.session.views
    
    if (!views) {
        views = req.session.views = {}
    }
    
    // get the url pathname 
    var pathname = parseurl(req).pathname
    
    // count the views 
    views[pathname] = (views[pathname] || 0) + 1
    
    next()
})