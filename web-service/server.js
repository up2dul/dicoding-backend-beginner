const http = require('http');

// HTTP response status code
const SUCCESS = 200;
const NOT_FOUND = 404;
const METHOD_NOT_ALLOWED = 405;

const requestListener = (request, response) => {
  const { method, url } = request;
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('X-Powered-By', 'NodeJS');

  if (url === '/') {
    if (method === 'GET') {
      response.statusCode = SUCCESS;
      response.end(JSON.stringify({
        message: 'Welcome to Home page',
      }));
    } else {
      response.statusCode = METHOD_NOT_ALLOWED;
      response.end(JSON.stringify({
        message: `Cannot access with ${method} request`,
      }));
    }
  } else if (url === '/about') {
    if (method === 'GET') {
      response.statusCode = SUCCESS;
      response.end(JSON.stringify({
        message: 'Welcome to About page',
      }));
    } else if (method === 'POST') {
      let body = [];

      request.on('data', (chunk) => {
        body.push(chunk);
      });

      request.on('end', () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);

        response.statusCode = SUCCESS;
        response.end(JSON.stringify({
          message: `Hii, ${name}! You are on About page`,
        }));
      });
    } else {
      response.statusCode = METHOD_NOT_ALLOWED;
      response.end(JSON.stringify({
        message: `Cannot access with ${method} request`,
      }));
    }
  } else {
    response.statusCode = NOT_FOUND;
    response.end(JSON.stringify({
      message: 'Page not found',
    }));
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port}`);
});
