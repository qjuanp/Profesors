module.exports = function(logFile){
	var fs = require("fs");
	var sprintf = require('sprintf').sprintf;
	return {
		log : function (ev,queueItem) {
			var logInformation =
		        sprintf("%s: %s - ContentType: %s HTTPCODE: %s Size: %s\n",
		        		ev,
		                queueItem.url,
		                queueItem.stateData.contentType,
		                queueItem.stateData.code,
		                queueItem.stateData.actualDataSize);
		  	
		  	console.log(logInformation);
			fs.appendFile(logFile, logInformation);	
		}
	}
}