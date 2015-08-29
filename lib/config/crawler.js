module.exports = {
		setup : function(crawler){
			crawler.interval = this.interval;
			crawler.maxConcurrency = this.maxConcurrency;
			crawler.supportedMimeTypes = this.supportedMimeTypes;
			
			crawler.addFetchCondition(this.discardStaticResources);
			
			crawler.fetchWhitelistedMimeTypesBelowMaxDepth = true;
		},

		discardStaticResources: function(parsedURL){
			return !parsedURL.path.match(/\.(css|jpg|pdf|docx|js|png|ico)/i);
		},

		interval : 1000,
		maxConcurrency : 1,
		supportedMimeTypes : [/^text\/(html|plain|richtext|xml){1}/gi,/^application\/xml/gi]
};