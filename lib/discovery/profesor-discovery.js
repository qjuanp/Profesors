module.exports = function(queueItem){
	return {
		currentItem: queueItem,
		isAProfesorPage:function(){
			console.log("Item to analise",this.currentItem);
			return this.currentItem.url.match(/profesor(es|s|a)/i) !== null;
		}
	};
};