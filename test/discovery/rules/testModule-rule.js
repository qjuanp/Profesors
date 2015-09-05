var testModule = function(){
	this.__ruleName = "testModule";
	this.__nextCallback = null;
};

testModule.prototype.setNextCallback = function(nextCallback){
	this.__nextCallback = nextCallback;
};

testModule.prototype.run = function($, queueItem, data){
	console.log("Execution from",this.__ruleName,this.__nextCallback);
	data['testModule']="we set this";
	if(this.__nextCallback) this.__nextCallback.run($, queueItem, data);
}

module.exports = testModule;