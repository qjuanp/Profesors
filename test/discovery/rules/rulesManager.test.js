var expect = require("chai").expect;
describe("Rules Manager Tests",function(){
	it("should be load an excecute all rules",function(done){
		// Given
		var rulesManager = require("../../../lib/discovery/rules/rulesManager");
		var rule = rulesManager(__dirname);

		// When
		rule(
			{},
			{url:'something'},
			function($,queueItem,data){
				console.log("Result Data",data);
				expect(queueItem).to.have.property('url','something');
				expect(data).to.have.property('testModule');
				expect(data).to.have.property('testAnotherModule');
				done();
			});
	});
});