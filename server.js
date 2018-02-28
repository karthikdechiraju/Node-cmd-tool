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
  }

  console.log(`server is listening on ${port}`)
})


var stdin = process.openStdin();

stdin.addListener("data", function(d) {
	var entered_string = d.toString().trim();
	var string_arr = entered_string.split(' ')
	if (string_arr[0]) {
		switch(string_arr[0].trim()){
			case 'def':
				Api.definition(string_arr[1])
				break;

			case 'syn':
				Api.synonym(string_arr[1])
				break;

			default:
				console.log(string_arr[0] + ' is not defined')
		}
	}else{

	}
});