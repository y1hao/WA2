const getGlossary = require('./getGlossary')
const display = require('./display')

module.exports = () => {
    const glossary = getGlossary()
    const index = Math.floor(Math.random() * glossary.length) 
    display(glossary[index])
}