const http = require('http')
const port = 3000
var Api = require('./api')
const requestHandler = (request, response) => {
	console.log(request.url)
	response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

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
		console.log('clear \t => \t Clear screen\n')
		console.log('')
	}
})


var stdin = process.openStdin();

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

			case 'clear':
				console.log('\033c')
				break;
			default:
				console.log(string_arr[0] + ' is not defined')
				break;
		}
	}else{
		Api.word_of_the_day()
	}
});