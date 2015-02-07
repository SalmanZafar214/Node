(function (homeController) {
    
    var data = require('../service');
    
    homeController.init = function (app) {
        
        //handling root path
        app.get('/', function (req, res) {
            
            data.getNoteCategories(function (err, results) {
                res.render('index', { title: "Node using Express and Vash", error: err, categories: results });
            })
        });
        
        app.get('/about*', function (req, res) {
            res.type('text/plain');
            res.send('About Page');
        });
        
        app.get('/Fortune', function (req, res) {
            data.getFortune(function (err, results) {
                res.render('fortune', {
                    title: "Node using Express and Vash", 
                    fortune: results, 
                    error: err,
                    query: req.query.style,
                    cookie: req.cookie,
                    session: req.session,
                });
            })
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