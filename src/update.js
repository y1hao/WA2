const config = require('../config.json')
const fs = require('fs')

module.exports = (cmd) => {
    if (cmd.list) {
        list()
    } else if (cmd.revert) {
        use(cmd.revert)
    } else {
        create()
    }
}

function create() {
    console.log('Creating a new glossary')
}

function use(id) {
    console.log('Using glossary #', id)
}

function list() {
    console.log('Listing glossaries')
}
