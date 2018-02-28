const http = require('http')
const port = 3000
var api = require('./api')
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
	require('./api')
	var entered_string = d.toString().trim();
	var string_arr = entered_string.split(' ')
	api.definition_api(string_arr[1])
});