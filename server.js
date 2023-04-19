const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const data = {
        "status": http.STATUS_CODES[200],
        "message":"Hello First API with JS"
    }
    res.end(JSON.stringify(data));
})

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
