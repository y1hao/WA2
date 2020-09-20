const config = require('../config.json')
const fs = require('fs')

module.exports = () => {
    const fileName = config.glossaries.filter(g => g.id === config.currentVersion)[0].fileName
    return JSON.parse(fs.readFileSync(`${__dirname}/../assets/${fileName}`))
}