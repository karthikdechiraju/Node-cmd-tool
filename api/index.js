const axios = require('axios');

module.exports.definition = function(text){
	axios.get('http://api.wordnik.com/v4/word.json/'+ text +'/definitions?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').then(response => {
		if (response.data.length > 0) {
			console.log('=> DEFINITIONS OF ' + text.toUpperCase())
			for (var i = 0; i < response.data.length; i++) {
				console.log('> '+response.data[i].text)
			}
		}else{
			console.log('=> No definition found')
		}
		console.log('')
	}).catch(error => {
	    console.log('=> No definition found')
		console.log('')
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
			console.log('=> SYNONYMS OF ' + text.toUpperCase())
			for (item in syn_array) {
				console.log('> '+syn_array[item])
			}
		}else{
			console.log('=> No synonym found')
		}
		console.log('')
	}).catch(error => {
		console.log('=> No synonym found')
		console.log('')
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
			console.log('=> ANTONYMS OF ' + text.toUpperCase())
			for (item in ant_array) {
				console.log('> '+ant_array[item])
			}
		}else{
			console.log('=> No antonym found')
		}
		console.log('')
	}).catch(error => {
	    console.log('=> No antonym found')
		console.log('')
	});
}


module.exports.example = function(text){
	axios.get('http://api.wordnik.com:80/v4/word.json/'+ text +'/topExample?useCanonical=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').then(response => {
		if (response.data.text) {
			console.log('=> EXAMPLES of ' + text.toUpperCase())
			console.log('> '+ response.data.text)
		}else{
			console.log('=> No example found')
		}
		console.log('')
	}).catch(error => {
	    console.log('=> No example found');
		console.log('')
	});
}

module.exports.word_of_the_day = function(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	axios.get('http://api.wordnik.com:80/v4/words.json/wordOfTheDay?date='+ year+'-'+ month+ '-' + day+ '-&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').then(response => {
		if (response.data) {
			console.log('=> WORD OF THE DAY : '+ response.data.word.toUpperCase())
			console.log('')
			
			console.log('=> Definitions')
			for (i in response.data.definitions) {
				console.log('> ' + response.data.definitions[i].text)
			}
			console.log('')
			console.log('=> Examples')
			for (i in response.data.examples) {
				console.log('> ' + response.data.examples[i].text)
			}
			console.log('')
			console.log('=> Note')
			console.log('> ' + response.data.note)
			console.log('')
		}else{
			console.log('=> No word found')
		}
		console.log('')
	}).catch(error => {
	    console.log('=> No word found');
		console.log('')
	});
}

