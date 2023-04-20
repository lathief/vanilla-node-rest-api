let books = require("../books");
const { writeDataToFile } = require("../utils");

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(books);
    })
}

function findSingle(id) {
    return new Promise((resolve, reject) => {
        const book = books.find((book) => book.id === parseInt(id));
        resolve(book);
    })
}

function create(book) {
    return new Promise((resolve, reject) => {
        const id = books.length + 1;
        const newBook = { id, ...book };
        books.push(newBook);
        writeDataToFile(books);
        resolve(newBook);
    })
}

function update(ID, book) {
    return new Promise((resolve, reject) => {
        const id = parseInt(ID)
        const indexBook = books.findIndex((book) => book.id === parseInt(ID));
        books[indexBook] = {id, ...book};
        writeDataToFile(books);
        resolve(books[indexBook]);
    })
}

module.exports = {
    findAll,
    findSingle,
    create,
    update
}