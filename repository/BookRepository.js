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
        const id = books[books.length - 1].id + 1
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

function remove(id) {
    return new Promise((resolve, reject) => {
        books = books.filter((book) => book.id !== parseInt(id))
        writeDataToFile(books);
        resolve()
    })
}

module.exports = {
    findAll,
    findSingle,
    create,
    update,
    remove
}