(function() {
    // var loading = document.getElementById("modal");

    /**
     * Search
     */
    Searcher.init();

    /**
     * start BarChart
     */
   /* Bar.settings = {
        title: "Top100 BarChart",
        desc: "This is a good example.",
        barId: "#barId"
    }
    Bar.init();*/

    /**
     * start treemap
     */
    /*Treemap.settings = {
        title: "Top100 treemap",
        desc: "You can click the block to zoom it.",
        treemapId: "#sacdlTreemap"
    }
    Treemap.init();
*/
    /*function show() {
        var loader = setTimeout(function() {
            loading.style.display = "block";
        }, 300);

        d3.json('/search', function(err, data) {
           
            if (err) {
                clearTimeout(loader);
                loading.style.display = "none";
                alert("加载数据失败，请检查您的网络设置。")
            };

            Utils.getData(data);

            Bar.show();
            Treemap.show();

            clearTimeout(loader);
            loading.style.display = "none";
        });
    }*/


    /*Searcher.addListener(function(url) {
        show(url);
    })*/

    //Show.show();
})()
