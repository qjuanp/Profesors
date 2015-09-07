module.exports = function(filePath){
	var fs = require("fs");
	var firstRule = null,
		lastRule = null,
		rules = [];
	var rulesDirectory = filePath === undefined? __dirname :  filePath;
	console.log("Files to load",fs.readdirSync(rulesDirectory));
	fs.readdirSync(rulesDirectory)
	  .forEach(function(file){
	  	if(file.match(/.*-rule.js$/i)){
			
			console.log("File To import:",file);		  
			
			var Rule = require(rulesDirectory + "/" + file);
		  	
			console.log("Rule imported", Rule);

			var currentRule = new Rule();
			
			console.log("Current Rule", currentRule);
			  
			if(!firstRule){
				firstRule = currentRule;
				rules.push(firstRule);		  		
				console.log("First Rule",firstRule,this.__nextCallback);
			} 
		  	else {
				if(lastRule)
				{
					console.log("Seting as next rule the LAST rule", lastRule.run);				
					currentRule.setNextCallback(lastRule);	
				}
				else {
					console.log("Seting as next rule the FIRST rule", firstRule.run);
					currentRule.setNextCallback(firstRule);
				}
		  		lastRule = currentRule;
				rules.push(lastRule);
				console.log("Last Rule before next iteration",lastRule, lastRule.__nextCallback);
		  	}
	  	}
	  });

	return function($,queueItem,resultCallback){
		console.log("RULES", rules);
		rules.forEach(function(rule) {
			rule.setResultCallback(resultCallback);
			console.log("SET RULE to",rule,resultCallback);
		});
		if(!lastRule){
			if(!firstRule)
			 	return console.error("NO RULES LOADED");
			console.log("Only first rule execution"),
			firstRule.run($,queueItem,{});
		} else {
			console.log("First Execution",lastRule,lastRule.__nextCallback);
			lastRule.run($,queueItem,{});
		}
	};
};