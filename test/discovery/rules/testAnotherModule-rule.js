var testAnotherModule = function(){
	this.__ruleName = "testAnotherModule";
	this.__nextCallback = null;
};

testAnotherModule.prototype.setNextCallback = function(nextCallback){
	this.__nextCallback = nextCallback;	
};


testAnotherModule.prototype.setResultCallback = function(resultCallback){
	this.__resultCallback = resultCallback;	
};

testAnotherModule.prototype.run = function($, queueItem, data){
	console.log("Execution from",this.__ruleName,this.__nextCallback);
	data['testAnotherModule'] ="we set this";
	if(this.__nextCallback) this.__nextCallback.run($, queueItem, data);
	this.__resultCallback(data);
}

module.exports = testAnotherModule;