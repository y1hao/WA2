const config = require('../config.json')
const fs = require('fs')

function create() {
    console.log('Creating a new glossary')
}

function use(id) {
    console.log('Using glossary #', id)
}

function list() {
    console.log('Listing glossaries')
}

module.exports = {
    create: create,
    use: use,
    list: list
}