const http = require("http");
const bookRepo = require("../repository/BookRepository");

// @desc   Get all books
// @route  GET /api/books
async function getAllBooks(req, res) {
  try {
    const books = await bookRepo.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(books));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: 500,
        message: err.message,
      })
    );
  }
}
// @desc   Get Single book by id
// @route  GET /api/books/:id
async function getBookById(req, res, id) {
  try {
    const book = await bookRepo.findSingle(id);
    if (!book) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: 404,
          message: "Book not found",
        })
      );
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(book));
    }
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: 500,
        message: err.message,
      })
    );
  }
}
module.exports = {
  getAllBooks,
  getBookById,
};
