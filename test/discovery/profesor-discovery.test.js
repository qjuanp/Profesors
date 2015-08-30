var expect = require("chai").expect;
var Profesor = require("../../lib/discovery/profesor-discovery");

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
});