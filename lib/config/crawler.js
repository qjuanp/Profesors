var crawlerConfig = {
		setup : function(crawler){
			crawler.interval = this.interval;
			crawler.maxConcurrency = this.maxConcurrency;
			crawler.maxDepth = 10;
			crawler.scanSubdomains = true;
			crawler.supportedMimeTypes = this.supportedMimeTypes;
			
			crawler.addFetchCondition(this.discardStaticResources);
			
			crawler.fetchWhitelistedMimeTypesBelowMaxDepth = true;
		},

		discardStaticResources: function(parsedURL){
			return !parsedURL.path.match(/\.(css|jpg|pdf|docx|js|png|woff|eot|ttf|gif|ico)/i);
		},

		interval : 10000,
		maxConcurrency : 1,
		supportedMimeTypes : [/^text\/(html|plain|richtext|xml){1}/gi,/^application\/xml/gi]
};

module.exports = crawlerConfig;