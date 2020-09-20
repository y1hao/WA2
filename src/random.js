const getGlossary = require('./getGlossary')
const fs = require('fs')

module.exports = () => {
    const glossary = getGlossary()
    const index = Math.floor(Math.random() * glossary.length) 
    console.log(glossary[index])
}