module.exports = function(htmlRequired, callback){
	var fs = require("fs");

	fs.readFile(
		__dirname + '/html/' + htmlRequired + '.html', 
		{ flag: 'r'},
		function(err,data){
			if(err) return console.error(err);
			callback(data);
		});
}