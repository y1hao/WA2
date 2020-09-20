const getGlossary = require('./getGlossary')
const display = require('./display')

module.exports = (initial) => {
    if (initial.length !== 1) {
        console.error('The \'list\' command must be used with a single letter, or *')
    }

    const glossary = getGlossary()
    let list
    if (initial !== '*') {
        list = glossary.filter(g => g.title[0].toLowerCase() === initial.toLowerCase())
    } else {
        list = glossary
    }
    display.list(list.map(g => g.title))
}