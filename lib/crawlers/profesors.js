var ProfesorCrawler = function(mainUrl){
	var Crawler = require("simplecrawler"),
		cheerio = require('cheerio'),
		sanitizeHtml = require('sanitize-html'),
		CrawlerConfig = require("../config/crawler"),
		ProfessorDiscovery = require("../discovery/profesor-discovery"),
		PagePersistence = require("../persistence/page");
	
	var pagePersistence = new PagePersistence();
	
	var crawler = Crawler.crawl(mainUrl);
	CrawlerConfig.setup(crawler);

	crawler.on("fetchcomplete", function(queueItem, buf, respose){
	    
	    var $ = cheerio.load(buf.toString());
	    var profesor = ProfessorDiscovery(queueItem);

	    var page = {
	    	url : queueItem.url,
	    	title : $('title').text(),
	    	content: sanitizeHtml(buf.toString(),{
				allowedTags : [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'a', 'ul', 'ol',
    							'nl', 'li', 'code', 'hr',  'div', 'table', 'thead', 
								'caption', 'tbody', 'tr', 'th', 'td', 'pre' ]
			}),
	    	createdAt: new Date(),
	    	lastRefreshAt: new Date(),
	    	type: profesor.isAProfesorPage()?"Profesor":"General"
	    };

	    console.info("Page information",page);

	    pagePersistence.save(page);
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
};

module.exports = ProfesorCrawler;
