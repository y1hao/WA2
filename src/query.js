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
                display(g)
                return
            }
        }
    }
    console.log('Cannot find entries with the name', query)
}

function queryInTitle(query) {
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
    for (const n of result) {
        console.log(n)
    }
}

function queryInContent(query) {
    const glossary = getGlossary()
    const key = query.join(' ').toLowerCase()
    const result = glossary.filter(g => g.description.toLowerCase().includes(key))
    for (const g of result) {
        console.log(g.title)
    }
}