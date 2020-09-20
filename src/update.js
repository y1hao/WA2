const config = require('../config.json')
const makeGlossary = require('./makeGlossary')
const request = require('request')
const fs = require('fs')

const GREEN = '\u001b[32m'
const HIGHLIGHT = '\u001b[93m'
const RESET = '\u001b[0m'
const AWS_GLOSSARY_PAGE_URI = 'https://docs.aws.amazon.com/general/latest/gr/glos-chap.html'

module.exports = (cmd) => {
    if (cmd.list) {
        list()
    } else if (cmd.revert) {
        if (cmd.revert === true) {
            revert()
        } else {
            use(cmd.revert)
        }
    } else if (cmd.delete){
        remove(cmd.delete)
    } else {
        create()
    }
}

function create() {
    console.log('Fetching data from', AWS_GLOSSARY_PAGE_URI, '...')
    request(
        { uri: AWS_GLOSSARY_PAGE_URI },
        function(error, response, body) {
            if (error) {
                console.error(error)
                return
            }
            console.log('Generating glossary ...')
            const glossary = makeGlossary(body)
            const creationTime = new Date()
            const fileName = `_${creationTime.toISOString().replace(/[.:-]/g, '')}.json`
            console.log('Saving results ...')
            fs.writeFileSync(`${__dirname}/../assets/${fileName}`, JSON.stringify(glossary, null, 2))
            const id = config.glossaries[config.glossaries.length - 1].id + 1
            config.glossaries.push( {id, fileName, creationTime} )
            config.currentVersion = id
            fs.writeFileSync(`${__dirname}/../config.json`, JSON.stringify(config, null, 2))
            console.log(`Created and using a new glossary (${HIGHLIGHT +'#' + id + RESET}, creation time: ${creationTime.toISOString()}) `)
        }
    )
}

function revert() {
    if (config.currentVersion === 0) {
        console.log('Already using the initial glossary.')
        return
    }
    let i = 0
    for (; i < config.glossaries.length; i++) {
        if (config.glossaries[i].id >= config.currentVersion) {
            break
        }
    }
    const glossary = config.glossaries[i - 1]
    config.currentVersion = glossary.id
    fs.writeFileSync(`${__dirname}/../config.json`, JSON.stringify(config, null, 2))
    console.log(`Revert to glossary list ${HIGHLIGHT +'#' + glossary.id + RESET} (creation time: ${glossary.creationTime})`)
}

function use(idString) {
    const id = Number.parseInt(idString)
    for (let i = 0; i < config.glossaries.length; i++) {
        if (id === config.glossaries[i].id) {
            config.currentVersion = id
            fs.writeFileSync(`${__dirname}/../config.json`, JSON.stringify(config, null, 2))
            const creationTime = config.glossaries[id].creationTime
            console.log(`Using glossary list ${HIGHLIGHT +'#' + id + RESET} (creation time: ${creationTime})`)
            return
        }
    }
    console.error(`Error: cannot find glossary list with id ${id}.`)
    console.log(`You may use ${HIGHLIGHT}\'wa2 update --list\'${RESET} to view all available glossary lists`)
}

function remove(idString) {
    const id = Number.parseInt(idString)
    if (id === 0) {
        console.error('Cannot remove the initial glossary')
        return
    }
    config.glossaries = config.glossaries.filter(g => g.id !== id)
    console.log(`Removed glossary ${HIGHLIGHT +'#' + id + RESET}.`)
    if (config.currentVersion === id) {
        config.currentVersion = config.glossaries[config.glossaries.length - 1].id
        console.log(`Now using glossary #${config.currentVersion}`)
    }
    fs.writeFileSync(`${__dirname}/../config.json`, JSON.stringify(config, null, 2))
    console.log(`You may use ${HIGHLIGHT}\'wa2 update --list\'${RESET} to view all available glossary lists`)
}

function list() {
    const list = config.glossaries.slice()
    list.sort((a, b) => Date.parse(b.creationTime) - Date.parse(a.creationTime))
    console.log(`\t\tId\tCreated`)
    for (const g of config.glossaries) {
        const row = `\t${g.id}\t${g.creationTime}`
        if (g.id === config.currentVersion) {
            console.log(GREEN + '\t*' + row + RESET)
        } else {
            console.log('\t' + row)
        }
    }
}
