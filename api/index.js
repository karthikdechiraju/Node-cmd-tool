const axios = require('axios');

module.exports.definition = function(text){
	axios.get('http://api.wordnik.com/v4/word.json/'+ text +'/definitions?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').then(response => {
		for (var i = 0; i < response.data.length; i++) {
			console.log(response.data[i].text)
		}
		console.log('\n')
	}).catch(error => {
	    console.log(error);
	});
}

module.exports.synonym = function(text){
	axios.get('http://api.wordnik.com:80/v4/word.json/'+ text +'/relatedWords?&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5&relationshipTypes=synonym').then(response => {
		var syn_array = [];
		for (var i = 0; i < response.data.length; i++) {
			if (response.data[i].relationshipType == "synonym") {
				syn_array = response.data[i].words;
			}
		}
		if (syn_array.length > 0) {
			for (item in syn_array) {
				console.log(syn_array[item])
			}
		}else{
			console.log('No synonym found')
		}
		console.log('\n')
	}).catch(error => {
	    console.log(error);
	});
}

