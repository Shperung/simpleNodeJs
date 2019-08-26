const http = require('http');
const fs = require('fs');

const server = (req, res) => {
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
console.log('Listening on 8080...');