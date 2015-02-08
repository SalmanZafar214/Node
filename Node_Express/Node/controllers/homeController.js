(function (homeController) {
    
    var data = require('../service');
    
    homeController.init = function (app) {
        
        //handling root path
        app.get('/', function (req, res) {
            
            data.getNoteCategories(function (err, results) {
                res.render('index', { title: "Node using Express and Vash", error: err, categories: results });
                req.session.userName = 'Anonymous';
            })
        });
        
        app.get('/about*', function (req, res) {
            res.type('text/plain');
            res.send('About Page');
        });
        
        app.get('/Fortune', function (request, res) {
            data.getFortune(function (err, results) {
                res.render('fortune', {
                    title: "Node using Express and Vash", 
                    fortune: results, 
                    error: err,
                    query: request.query.style,
                    cookie: request.cookie,
                    session: request.session.userName,
                });
            })
        });
        
        
        app.post('/process', function (req, res) {
            console.log('Form (from querystring): ' + req.query.form);
            console.log('CSRF token (from hidden form field): ' + req.body._csrf);
            console.log('Name (from visible form field): ' + req.body.name);
            console.log('Email (from visible form field): ' + req.body.email);
            res.redirect(303, '/fortune'); //redirecting with status code

            req.session.userName = 'Anonymous';

            //if (req.xhr || req.accepts('json,html') === 'json') {
            //    // if there were an error, we would send { error: 'error description' }
            //    res.send({ success: true });
            //} else {
            //    // if there were an error, we would redirect to an error page
            //    res.redirect(303, '/thank-you');
            //}
        });
        
        
        
        // custom 404 page
        app.use(function (req, res) {
            res.type('text/plain');
            res.status(404);
            res.send('404 - Not Found');
        });
        // custom 500 page
        app.use(function (err, req, res, next) {
            console.error(err.stack);
            res.type('text/plain');
            res.status(500);
            res.send('500 - Server Error');
        });

    
    };

})(module.exports)