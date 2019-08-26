const http = require('http');
const fs = require('fs');
const url = require('url');

// простий варіант
/*const server = (req, res) => {
	res.writeHead(200, {
		'Content-type':'text/html;charset=utf-8',
	});

	fs.readFile('index.html', (err, content) => {
		res.write(decodeURIComponent(content));
		res.end();
	});
};

const app = http.createServer(server);

app.listen(8080);
console.log('Listening on 8080...');*/

// варіант на подіях

const server = http.createServer().listen(8080);

server.on('request', (req, res) => {
	res.writeHead(200, {
		'Content-type':'text/html;charset=utf-8',
	});

	fs.readFile('index.html', (err, content) => {
		res.write(decodeURIComponent(content));
		res.end();
	});
});

server.on('request', (req, res) => {
	console.log('REQUEST:', req.method, req.url);
	console.log('STATUS:', res.statusCode);
	console.log('URL:', url.parse(req.url, true));
});

server.on('listening', () => {
	console.log('Listening on 8080......');
});

