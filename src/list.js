const getGlossary = require('./getGlossary')

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

    for (const g of list) {
        console.log(g.title)
    }
}