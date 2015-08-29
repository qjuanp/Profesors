module.exports = function(queueItem){
	var CrawlerLogger = require("../crawler-logger");
	var profesorsLog = CrawlerLogger("./profesors-log.txt");
	var isAProfesorPage = function(url,buf){
		return url.match(/profesor(es|s|a)/i);
	};

	return {
		currentItem: queueItem,
		process:function(){
			if(isAProfesorPage(queueItem.url,queueItem.conte)){
	    		profesorsLog.log("Found!",queueItem);
	    		return true;
			} else {
				profesorsLog.log("Isn't a profesor",queueItem);
				return false;
			}
		}
	};
};