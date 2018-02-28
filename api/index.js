const axios = require('axios');

module.exports.definition = function(text){
	axios.get('http://api.wordnik.com/v4/word.json/'+ text +'/definitions?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').then(response => {
		if (response.data.length > 0) {
			for (var i = 0; i < response.data.length; i++) {
				console.log('> '+response.data[i].text)
			}
		}else{
			console.log('> No definition found')
		}
		console.log('\t')
	}).catch(error => {
	    console.log('> No definition found')
	});
}

module.exports.synonym = function(text){
	axios.get('http://api.wordnik.com:80/v4/word.json/'+ text +'/relatedWords?&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5&relationshipTypes=synonym').then(response => {
		var syn_array = [];
		for (i in response.data) {
			if (response.data[i].relationshipType == "synonym") {
				syn_array = response.data[i].words;
			}
		}
		if (syn_array.length > 0) {
			for (item in syn_array) {
				console.log('> '+syn_array[item])
			}
		}else{
			console.log('> No synonym found')
		}
		console.log('\t')
	}).catch(error => {
		console.log('> No synonym found')
	});
}

module.exports.antonym = function(text){
	axios.get('http://api.wordnik.com:80/v4/word.json/'+ text +'/relatedWords?&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5&relationshipTypes=antonym').then(response => {
		var ant_array = [];
		for (i in response.data) {
			if (response.data[i].relationshipType == "antonym") {
				ant_array = response.data[i].words;
			}
		}
		if (ant_array.length > 0) {
			for (item in ant_array) {
				console.log('> '+ant_array[item])
			}
		}else{
			console.log('> No antonym found')
		}
		console.log('\t')
	}).catch(error => {
	    console.log('> No antonym found')
	});
}


module.exports.example = function(text){
	axios.get('http://api.wordnik.com:80/v4/word.json/'+ text +'/topExample?useCanonical=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').then(response => {
		if (response.data.text) {
			console.log('> '+ response.data.text)
		}else{
			console.log('> No example found')
		}
		console.log('\t')
	}).catch(error => {
	    console.log('> No example found');
	});
}