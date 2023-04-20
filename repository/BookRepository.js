let books = require("../books");

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


module.exports = {
    findAll,
    findSingle
}