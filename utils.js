const fs = require('fs')
const filename = './books.json'
function writeDataToFile(content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if(err) {
            console.log(err)
        }
    })
}

module.exports = {
    writeDataToFile
}
