const http = require('http');

// HTTP response status code
const SUCCESS = 200;
const NOT_FOUND = 404;
const METHOD_NOT_ALLOWED = 405;

const requestListener = (request, response) => {
  const { method, url } = request;
  response.setHeader('Content-Type', 'text/html');

  if (url === '/') {
    if (method === 'GET') {
      response.statusCode = SUCCESS;
      response.end('<h1>Welcome to Home page!</h1>');
    } else {
      response.statusCode = METHOD_NOT_ALLOWED;
      response.end(`<h1>Cannot access with ${method} request</h1>`);
    }
  } else if (url === '/about') {
    if (method === 'GET') {
      response.statusCode = SUCCESS;
      response.end('<h1>Welcome to About page!</h1>');
    } else if (method === 'POST') {
      let body = [];

      request.on('data', (chunk) => {
        body.push(chunk);
      });

      request.on('end', () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);

        response.statusCode = SUCCESS;
        response.end(`<h1>Hii, ${name}! You are on About page</h1>`);
      });
    } else {
      response.statusCode = METHOD_NOT_ALLOWED;
      response.end(`<h1>Cannot access with ${method} request</h1>`);
    }
  } else {
    response.statusCode = NOT_FOUND;
    response.end('<h1>Page not found</h1>');
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port}`);
});
