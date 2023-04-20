const http = require("http");
const bookRepo = require("../repository/BookRepository");

async function getAllBooks(req, res) {
    try {
        const books = await bookRepo.findAll();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(books));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            status: 500,
            message: err.message,
          })
        );
    }
}
module.exports = {
    getAllBooks
}