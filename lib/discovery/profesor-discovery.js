module.exports = function(queueItem){
	var cheerio = require('cheerio');
	return {
		currentItem: queueItem,
		isAProfesorPage:function(){
			console.log("Item to analise",this.currentItem);
			return this.currentItem.url.match(/profesor(es|s|a)/i) !== null;
		},
		extract: function(buff, callback, err){
			$ = cheerio.load(buff.toString());
			
		}
	};
};