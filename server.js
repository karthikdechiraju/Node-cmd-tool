const http = require('http')
const port = 3000
var Api = require('./api')
const axios = require('axios');

const server = http.createServer()

server.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err)
	}else{
		console.log('')
		console.log('\t\t\tWELCOME TO NODE DICTIONARY\n')
		console.log('Enter these commands to explore')
		console.log('def \t => \t Get definitions of a word')
		console.log('syn \t => \t Get synonyms of a word')
		console.log('ant \t => \t Get antonyms of a word')
		console.log('ex \t => \t Get examples of a word')
		console.log('dict \t => \t Get full details of a word')
		console.log('today \t => \t Get word of the day (press ENTER to get word of the day)')
		console.log('play \t => \t Play a word game')
		console.log('clear \t => \t Clear screen\n')
		console.log('')
	}
})


var stdin = process.openStdin();

var req_obj = {};
var required_word ='';
var show_options = false;

stdin.addListener("data", function(d) {
	var entered_string = d.toString().trim();
	var string_arr = entered_string.split(' ')
	if (string_arr[0]) {
		switch(string_arr[0].toLowerCase().trim()){
			case 'def':
				Api.definition(string_arr[1])
				break;

			case 'syn':
				Api.synonym(string_arr[1])
				break;

			case 'ant':
				Api.antonym(string_arr[1])
				break;

			case 'ex':
				Api.example(string_arr[1])
				break;

			case 'today':
				Api.word_of_the_day()
				break;

			case 'dict':
				Api.definition(string_arr[1])
				Api.synonym(string_arr[1])
				Api.antonym(string_arr[1])
				Api.example(string_arr[1])
				break;

			case 'play':
				axios.get('http://api.wordnik.com:80/v4/words.json/randomWord?excludePartOfSpeech=noun-plural&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').then(response => {
					required_word = response.data.word
					axios.get('http://api.wordnik.com/v4/word.json/'+ required_word +'/definitions?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').then(response_def => {
						req_obj['definition'] = [];
						for(item in response_def.data){
							req_obj['definition'].push(response_def.data[item].text)
						}
						axios.get('http://api.wordnik.com:80/v4/word.json/'+ required_word +'/relatedWords?&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5').then(response_rel => {
							for(i in response_rel.data){
								if (response_rel.data[i].relationshipType == 'synonym') {
									req_obj['synonym'] = response_rel.data[i].words
								}
								if (response_rel.data[i].relationshipType == 'antonym') {
									req_obj['antonym'] = response_rel.data[i].words
								}
							}
							var r = get_a_random_word(req_obj)
							console.log('Guess the correct the word whose ' + r.type + ' is " '+r.word + ' "')
						})
					})
				})
				break;

			case 'clear':
				console.log('\033c')
				break;
			default:
				var obj_keys = Object.keys(req_obj);
				if (obj_keys.length > 0) {
					if (!show_options) {
						if(string_arr[0].toLowerCase().trim() == required_word.toLowerCase().trim()){
							console.log('YAY! You have answered correctly')
							show_options = false;
							required_word = '';
							req_obj = {};
							console.log('Thanks for playing')
							console.log('>>>>>>>>>>>>>>\n')
						}else{
							console.log('Ooops!! The answer is incorrect. Pleae chose an option to continue')
							show_options = true;
							console.log('1.Try again \t 2.Hint \t 3.Quit')
						}
					}else{
						if (parseInt(string_arr[0].trim()) == 1) {
							console.log('')
							console.log('Please try again')
							show_options = false;
						}else if(parseInt(string_arr[0].trim()) == 2){
							if (Object.keys(req_obj).length > 1) {
								var r = get_a_random_word(req_obj)
								console.log('The anwser is the ' + r.type + ' of " '+r.word + ' "')
							}else{
								console.log('This is the jumbled version of the answer : ' + required_word.shuffle())	
							}
							show_options = false;
						}else if(parseInt(string_arr[0].trim()) == 3){
							show_options = false;
							required_word = '';
							req_obj = {};
							console.log('Thanks for playing')
							console.log('>>>>>>>>>>>>>>\n')
						}else{
							console.log('Pleae chose an option from 1, 2 and 3 to continue')
							show_options = true;
							console.log('1.Try again \t 2.Hint \t 3.Quit')
						}
					}
				}else{
					console.log(string_arr[0] + ' is not defined')
				}
				break;
		}
	}else{
		Api.word_of_the_day()
	}
});


function get_a_random_word(obj){
	var obj_keys = Object.keys(obj)
	// console.log(obj_keys)
	var num = Math.floor(Math.random() * obj_keys.length)+0;
	var req_type = obj[obj_keys[num]];
	if (req_type.length > 1) {
		var num2 = Math.floor(Math.random() * req_type.length)+0;
		var req_word = req_type[num]
	}else{
		var req_word = req_type[0]
	}
	return {
		type:obj_keys[num],
		word:req_word
	}
}


String.prototype.shuffle = function() {
    return this.split(" ").map(function(word, i) {
        var a = word.split(""),
            n = a.length;

        for (var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }

        return a.join("");
    }).join(" ");
}