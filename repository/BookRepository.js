let books = require("../books");

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(books);
    })
}

module.exports = {
    findAll
}