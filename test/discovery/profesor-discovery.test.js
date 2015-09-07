var expect = require("chai").expect,
	Profesor = require("../../lib/discovery/profesor-discovery"),
	htmlData = require("../data/htmlData"),
	cheerio = require("cheerio");

describe("Profesor Discovery Data", function() {
	it("should be user the url as profesor", function(){
		// Given
		var queueItem = {
			url:'https://sistemas.uniandes.edu.co/es/nuestra-gente/profesores-adminitrativos/planta',
			stateData:{
				contentType:'TestingContentType',
				code:200,
				actualDataSize:1000
			}
		};

		var profesor = new Profesor(queueItem);

		// When
		var result = profesor.isAProfesorPage();

		// Then
		expect(result).to.be.equal(true);
	});

	it("sould be not use the url as profesor",function(){
		// Given
		var queueItem = {
			url:'https://sistemas.uniandes.edu.co/es/posgrados/general/inicio',
			stateData:{
				contentType:'TestingContentType',
				code:200,
				actualDataSize:1000
			}
		};

		var profesor = new Profesor(queueItem);

		// When
		var result = profesor.isAProfesorPage();

		// Then
		expect(result).to.be.equal(false);
	});

	it("should be load html data",function(done){	
		// Given
		htmlData('profesors_visitantes', function(content){
			expect(content).to.be.not.equal(undefined);
			done();
		});
	});

	it("should be extrat a Profesor from 'Sistemas' page", function(done){
		// Given
		htmlData('profesors_visitantes', function(content){
			// Given
			var rulesManager = require("../../lib/discovery/rules/rulesManager"),
				run = rulesManager(),
				$ = cheerio.load(content),
				queueItem = {
					url: "https://sistemas.uniandes.edu.co/es/nuestra-gente/profesores-adminitrativos/vistantes"
				};
			run($,queueItem,function(data){
				console.log("Profesor data", data);
			});
		});
	});
});