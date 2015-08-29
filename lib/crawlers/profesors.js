module.exports = function(mainUrl){
	var CrawlerConfig = require("../config/crawler");
	var CrawlerLogger = require("./crawler-logger");
	var ProfessorDiscovery = require("./profesor-discovery");
	var Crawler = require("simplecrawler");	
	var cheerio = require('cheerio');
	
	var logger = CrawlerLogger("./academicUnits.txt");
	
	var crawler = Crawler.crawl(mainUrl);
	CrawlerConfig.setup(crawler);

	crawler.on("fetchcomplete", function(queueItem, data, respose){

	    logger.log("Completed",queueItem);

	    console.log("Esta vuelta", ProfessorDiscovery);

	    var profesor = ProfessorDiscovery(queueItem);

	    profesor.process();
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