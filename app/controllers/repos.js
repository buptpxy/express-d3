var Repo = require('../models/repo');
var preMsg;
var ReposController = {
    //get '/'
    index: function(req, res) {
        res.render('repos/index');
    },

    //get '/search'
    search: function(req, res) {
        console.log('premsgjsonstart:'+JSON.stringify(preMsg));
        var msg;
        if (!req.body){
            msg =  {
                q: 'bitcoin',
                sort: 'forks',
                order: 'desc',
                per_page: 100
            };
        }else if ((JSON.stringify(req.body) == "{}")) {
            msg = preMsg;
        }else {
            var msg = req.body;
            preMsg = msg;
        };

        /**
        * query可以是一个参数列表
        * GET /search?q=bitcoin&sort=forks&order=desc&per_page=100
        */
        console.log('req.bodyjson:'+JSON.stringify(req.body));
        console.log('msgjson:'+JSON.stringify(msg));
        console.log('premsgjsonend:'+JSON.stringify(preMsg));
        Repo.search(msg, function(err, data) {
            res.json(data);
        });

    }
}

module.exports = ReposController;
