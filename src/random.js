const getGlossary = require('./getGlossary')

module.exports = () => {
    const glossary = getGlossary()
    const index = Math.floor(Math.random() * glossary.length) 
    console.log(glossary[index])
}