var profesorDiscovery = require("./lib/crawlers/profesors");
var url = process.argv[2];
profesorDiscovery(url? url : "http://sistemas.uniandes.edu.co/");