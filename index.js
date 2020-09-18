const program = require('commander')
const package = require('./package.json')
const actions = require('./src/actions')

function main() {
    program.version(package.version, '-v, --version')

    program.arguments('[query...]')
        .action(actions.query)
    
    program.option('-t, --title [query...]')
        .action(actions.queryInName)

    program.option('-c, --content [query...]')
        .action(actions.queryInContent)

    program.option('-l, --list [letter]')
        .action(actions.list)

    program.option('-u, --update')
        .action(actions.update)

    program.option('-r, --revert [id]')
        .action(actions.revert)
    
    program.option('-g, --glossary')
        .action(actions.glossary)

    program.option('-a, --any')
        .action(actions.random)
    

    program.parse(process.argv)
}

module.exports = main