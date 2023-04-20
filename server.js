const http = require("http");
const { getAllBooks } = require("./controller/BookController");


const server = http.createServer((req, res) => {
  if (req.url === "/api/books" && req.method === "GET") {
    getAllBooks(req, res);
  }
  else if (req.url === "/api/" && req.method === "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    const data = {
      status: http.STATUS_CODES[200],
      message: "Hello First API with JS",
    };
    res.end(JSON.stringify(data));
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        status: http.STATUS_CODES[404],
        message: 'Route Not Found: Please use the api/books endpoint',
      })
    );
  }
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
