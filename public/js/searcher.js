var Searcher = (function() {
    var url = '',
        baseApiUrl,
        inputTxt,
        searchBtn,
        searchMsg,
        listeners = [],
        query = {
            q: "bitcoin",
            sort: "forks",
            order: "desc",
            per_page: 100
        };

    return {
        settings: {
            baseApiUrl: 'https://api.github.com/search/repositories'
        },

        init: function() {
            inputTxt = d3.select('#search-input');
            searchBtn = d3.select('#search-btn');
            searchMsg = d3.select('#search-msg')

            baseApiUrl = this.settings.baseApiUrl;

            searchBtn.on('click', function() {
                parseQuery();
                listeners.forEach(function(listener) {
                    try {
                        listener(url);
                    } catch (error) {
                        console.log(error);
                    }
                });
                fetchQuery();
                /**
                 * start BarChart
                 */
                Bar.settings = {
                    title: "Top100 BarChart",
                    desc: "This is a good example.",
                    barId: "#barId"
                }
                Bar.init();

                /**
                 * start treemap
                 */
                Treemap.settings = {
                    title: "Top100 treemap",
                    desc: "You can click the block to zoom it.",
                    treemapId: "#sacdlTreemap"
                }
                Treemap.init();
            });
        },

        addListener: function(listener) {
            listeners.push(listener);
        }
    };

    function parseQuery() {
        query.q = inputTxt.property('value') || 'bitcoin';
        
        var arr = [];

        for (var key in query) {
            arr.push(key + '=' + query[key]);
        };

        url = baseApiUrl + '?' + arr.join('&');

        console.log(url);
        searchMsg.text('当前搜索地址: ' + url);
        return url;
    }
    //发送Post请求  
    function fetchQuery(){
        query.q = inputTxt.property('value') || 'bitcoin';
        var queryjson =  JSON.stringify(query); 
        fetch("/search", {
           method: "POST",
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(query)
       }).then(function(res) {
            Show.show();
            return res.json();
       }).catch(function(e) {
          console.log("error");
        });
    }  
}());
