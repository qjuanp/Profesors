var mongoose = require('mongoose');

var PageSchema = mongoose.Schema({
	url: 				String,
	title: 				String,
	content: 			String,
	createdAt: 			Date,
	lastRefreshAt: 		Date,
	type: 				String 
});

var PagePersistence = function(){
	mongoose.connect('mongodb://localhost:27017/Profesors');
	
	var db = mongoose.connection;
	var PageModel = mongoose.model('Page', PageSchema);

	return {
		save: function(page){
			console.info("Begin Save of",page.url);

			var pageModel = new PageModel(page);
			pageModel.save(function(err){
				if (err) return console.error(err);
			});
		}
	};
};

module.exports = PagePersistence;