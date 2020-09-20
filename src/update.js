const config = require('../config.json')
const makeGlossary = require('./makeGlossary')
const request = require('request')
const fs = require('fs')

const AWS_GLOSSARY_PAGE_URI = 'https://docs.aws.amazon.com/general/latest/gr/glos-chap.html'

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
    request(
        { uri: AWS_GLOSSARY_PAGE_URI },
        function(error, response, body) {
            if (error) {
                console.error(error)
            }
            const glossary = makeGlossary(body)
            console.log(glossary)
        }
    )
}

function use(idString) {
    const id = Number.parseInt(idString)


    console.log('Using glossary #', id)
}

function list() {
    console.log('Listing glossaries')
}
