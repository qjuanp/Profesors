var testModule = function(){
	this.__ruleName = "testModule";
	this.__nextCallback = null;
};

testModule.prototype.setNextCallback = function(nextCallback){
	this.__nextCallback = nextCallback;
};


testModule.prototype.setResultCallback = function(resultCallback){
	this.__resultCallback = resultCallback;	
};

testModule.prototype.run = function($, queueItem, data){
	console.log("Execution from",this.__ruleName,this.__nextCallback);
	data['testModule']="we set this";
	this.__resultCallback(data);
	if(this.__nextCallback) this.__nextCallback.run($, queueItem, data);
	this.__resultCallback(data);
}

module.exports = testModule;