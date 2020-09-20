const getGlossary = require('./getGlossary')
const display = require('./display')

module.exports = (query, cmd) => {
    if (cmd.title) {
        queryInTitle(query)
    }
    if (cmd.content) {
        queryInContent(query)
    }
    if (!cmd.title && !cmd.content) {
        queryExact(query)
    }
}

function queryExact(query) {
    const glossary = getGlossary()
    const key = query.join(' ').toLowerCase()
    for (const g of glossary) {
        for (const n of g.names) {
            if (key === n.toLowerCase()) {
                display.single(g)
                return
            }
        }
    }
    console.log('Cannot find entries with the name', query)
}

function queryInTitle(query) {

    console.log(`Searching for items containing '${query.join(' ')}' in titles ...`)

    const glossary = getGlossary()
    const key = query.join(' ').toLowerCase()
    const result = []
    for (const g of glossary) {
        for (const n of g.names) {
            if (n.toLowerCase().includes(key)) {
                result.push(n)
            }
        }
    }
    result.sort()
    display.list(result)
}

function queryInContent(query) {

    console.log(`Searching for items containing '${query.join(' ')}' in contents ...`)

    const glossary = getGlossary()
    const key = query.join(' ').toLowerCase()
    const result = glossary.filter(g => g.description.toLowerCase().includes(key))
    display.list(result.map(g => g.title))
}