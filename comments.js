// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = [];

// Create server
http.createServer(function(request, response){
	// Parse the request URL
	var urlObj = url.parse(request.url, true);
	// Get the path name
	var pathname = urlObj.pathname;
	// Get the query string
	var query = urlObj.query;

	// Handle the request
	if (pathname === '/'){
		// Read the file
		fs.readFile('./index.html', function(err, data){
			if (err){
				console.log(err);
				response.writeHead(500, {'Content-Type': 'text/plain'});
				response.end('500 - Internal Error');
			} else {
				response.writeHead(200, {'Content-Type': 'text/html'});
				response.end(data);
			}
		});
	} else if (pathname === '/comment'){
		// Add the comment
		comments.push(query.comment);
		// Redirect to the home page
		response.writeHead(303, {'Location': '/'});
		response.end();
	} else if (pathname === '/getComments'){
		// Send the comments
		response.writeHead(200, {'Content-Type': 'application/json'});
		response.end(JSON.stringify(comments));
	} else {
		// Return 404
		response.writeHead(404, {'Content-Type': 'text/plain'});
		response.end('404 - Not Found');
	}
}).listen(3000);
console.log('Server is running at http://localhost:3000/');