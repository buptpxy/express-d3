var Show = (function () {
	/*var loading = document.getElementById("modal");
	var loader = setTimeout(function() {
            loading.style.display = "block";
        }, 300);*/
	return {
		show : function () {
			d3.json('/search', function(err, data) {
           
	            if (err) {
	                clearTimeout(loader);
	                loading.style.display = "none";
	                alert("加载数据失败，请检查您的网络设置。");
	            };

	            Utils.getData(data);

	            Bar.show();
	            Treemap.show();

	            /*clearTimeout(loader);
	            loading.style.display = "none";*/
        	});
		}
	};
        
}());