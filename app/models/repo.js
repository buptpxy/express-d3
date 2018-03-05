var GitHubApi = require("github");

/**
 * from https://www.npmjs.com/package/github
 * @type {GitHubApi}
 */
var github = new GitHubApi({
    // required 
    version: "3.0.0",
    // optional 
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub 
    pathPrefix: "", // for some GHEs; none for GitHub 
    timeout: 5000,
    headers: {
        "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent 
    }
});

var Repo = {
    /**
     * [search repos from github.com]
     * @param  {[type]}   msg      query string
     * @param  {Function} callback 
     * @return {[type]}            [void]
     */
    search: function(msg, callback) {
        if ((!msg) || (JSON.stringify(msg) == "{}")){
                // msg = {
                // q: 'bitcoin',
                // sort: 'forks',
                // order: 'desc',
                // per_page: 100
                // };
            return;
        };
        /*var msg = msg || {
            q: 'bitcoin',
            sort: 'forks',
            order: 'desc',
            per_page: 100
        }*/
        console.log('msg:'+JSON.stringify(msg));
        github.search.repos(msg, function (err, data) {
            if (err) {return console.log(err)};
            var dataSet = treeData(data);
            //console.log('dataSetjson:'+JSON.stringify(dataSet));
            callback(null, dataSet);
        });
    }
}

// from /public/js/utils.js
function treeData(data) {
    var dataSet = data.data;
   /* var items1 = dataSet.items;
    console.log('items1:'+items1);*/
    var languages = {};

    var result = {
        "name": "languages",
        "children": []
    }

    if (dataSet && dataSet.items) {
        var items = dataSet.items;

        items.forEach(function(item, index) {
            if (typeof languages[item.language] === "undefined") {
                languages[item.language] = index;
            };
        })

        for (var language in languages) {
            if (language === "null") {
                language = "others";
            };

            var root = {
                "name": language,
                "children": []
            };

            items.forEach(function(item, index) {
                var child = {
                    "name": item.full_name,
                    "watchers_count": item.watchers_count,
                    "forks_count": item.forks_count
                };

                if (item.language === language || (item.language === "null" && language === "others")) {
                    root.children.push(child);
                };
            })

            result.children.push(root);
        }
    }

    return result;
}

module.exports = Repo;
