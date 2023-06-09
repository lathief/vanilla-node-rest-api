const http = require("http");
const bookRepo = require("../repository/BookRepository");
const { getReqBody } = require("../utils");

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

// @desc   Create a book
// @route  POST /api/books
async function createBook(req, res) {
  try {
    const body = await getReqBody(req);
    const { name_book, author, price } = JSON.parse(body);
    const book = {
      name_book,
      author,
      price,
    };
    const newbook = await bookRepo.create(book);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: http.STATUS_CODES[201],
        message: "Book created",
      })
    );
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

// @desc   Update a book
// @route  PUT /api/books/:id
async function updateBook(req, res, id) {
  try {
    const getBook = await bookRepo.findSingle(id);
    if (!getBook) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: 404,
          message: "Book not found",
        })
      );
    } else {
      const body = await getReqBody(req);
      const { name_book, author, price } = JSON.parse(body);
      console.log(name_book, author, price);
      const book = {
        name_book: name_book || getBook.name,
        author: author || getBook.author,
        price: price || getBook.price,
      };
      const updatebook = await bookRepo.update(id, book);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: http.STATUS_CODES[200],
          message: "Book updated",
        })
      );
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

// @desc   Delete Single book by id
// @route  DELETE /api/books/:id
async function deleteBook(req, res, id) {
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
      await bookRepo.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: 200,
          message: "Book deleted",
        })
      );
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
  createBook,
  updateBook,
  deleteBook,
};
