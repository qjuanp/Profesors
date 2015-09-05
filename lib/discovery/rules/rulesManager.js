module.exports = function(filePath){
	var fs = require("fs");
	var firstRule = null,
		lastRule = null;
	var rulesDirectory = filePath === undefined? __dirname : filePath;
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
				console.log("Last Rule before next iteration",lastRule, lastRule.__nextCallback);
		  	}
	  	}
	  });

	return function($,queueItem,resultRule){
		if(!lastRule){
			if(!firstRule)
			 	return console.error("NO RULES LOADED");
			console.log("Only first rule execution"),
			firstRule.setNextCallback({__ruleName:"results",run:resultRule});
			firstRule.run($,queueItem,{});
		} else {
			console.log("First Execution",lastRule,lastRule.__nextCallback);
			firstRule.setNextCallback({__ruleName:"results",run:resultRule});
			lastRule.run($,queueItem,{});
		}
	};
};