module.exports = function(mainUrl){
	var CrawlerConfig = require("./crawler-config");
	var CrawlerLogger = require("./crawler-logger");
	var Crawler = require("simplecrawler");	
	var cheerio = require('cheerio');
	
	var logger = CrawlerLogger("./academicUnits.txt");
	
	var crawler = Crawler.crawl(mainUrl);
	CrawlerConfig.setup(crawler);

	crawler.discoverResources = function(buf, queueItem) {
    	
    	$ = cheerio.load(buf.toString());
    	var resources = [];

    	// Search on all <a> tags
    	$('a')
    		.filter(function(i, el){
    			var title = $(this).text();
    			var href = $(this).attr('href');

    			console.log("To filter: %s %s",title,href);

    			return title.match(/(facultad|escuela|centro|departamento){1}/i);
    		})
    		.each(function(i, el){
    			var title = $(this).text();
    			var href = $(this).attr('href');

    			if(href.match(/(http(s)?:\/\/)/i)){
    				console.log("Finded %s %s", title, href);
    				resources.push(href);
    			}
    		});

    	// resources.forEach(function(item){ crawler.queueURL(item, queueItem);});
    	return resources;
	};

	crawler.on("discoverycomplete",function(queueItem, resources){
		console.log("!!!Founded Resources",resources);
		resources.forEach(function(item){
			console.log("Resource to analyze",item);
		});
	});

	crawler.on("fetchcomplete", function(queueItem, data, respose){
	    logger.log("Completed",queueItem);
	});

	crawler.on("queueadd", function (queueItem) {
		console.log("Enqueue Added Correctly:",queueItem);
	});

	crawler.on("queueduplicate", function (url) {
		console.log("Enqueue Duplicated:",url);
	});

	crawler.on("queueerror", function (errorData, URLData) {
		console.log("Enqueue Error:",errorData,URLData);
	});
	crawler.start();
}