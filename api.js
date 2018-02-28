const http = require('http');

module.exports.definition_api = function(text){
	http.get('http://api.wordnik.com/v4/word.json/'+ text +'/definitions?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5', (resp) => {
		
		let data = '';
		
		resp.on('data', (chunk) => {
			data += chunk;
		});

		resp.on('end', () => {
			var arr = JSON.parse(data);
			// console.log('\n')
			for (var i = 0; i < arr.length; i++) {
				console.log(arr[i].text)
			}
			console.log('\n')
		});

	}).on("error", (err) => {
		console.log("Error: " + err.message);
	});
}