var sistemasRule = function(){
	this.__ruleName = "sistemasRule";
	this.__nextCallback = null;
};

sistemasRule.prototype.setNextCallback = function(nextCallback){
	this.__nextCallback = nextCallback;	
};


sistemasRule.prototype.setResultCallback = function(resultCallback){
	this.__resultCallback = resultCallback;	
};

sistemasRule.prototype.run = function($, queueItem, data)
{
	console.log("Execution from",this.__ruleName,this.__nextCallback);

	if(queueItem.url.match(/.*sistemas.uniandes.edu.co.*/i)) 
	{		
		var profesors =  $('li')
		 .map(function(i,el){
			 $(this).find('h3').each(function(i,el){
				 console.log("Name of profesor", el);
			 });
			 var profesor = {
				name : $(this).children('h3').first().text(),
				sacale: $(this).childer('h4').first().text(),
				area:  'Departamento de Ingeniería de Sistemas y Computación',
				faculty: 'Ingeniería'
			 };
			 
			 profesor.email = $(this).text().match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i).first();
							 
			 return profesor;
		 })
		 .get();
		 
		 console.log("Profesors",profesors);
		 
		 profesors.forEach(function(item){
			 this.__resultCallback(item);
		 },this);
	}
	
	if(this.__nextCallback) this.__nextCallback.run($, queueItem, data);
}

module.exports = sistemasRule;