var repos = require('./controllers/repos');

var Router = function(app) {
	app.get('/', repos.index);
	app.post('/search', repos.search);
    app.get('/search', repos.search);  
}

module.exports = Router;