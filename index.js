const program = require('commander')
const package = require('./package.json')
const actions = require('./src/actions')

function main() {
    program.version(package.version, '-v, --version')

    program.arguments('[query...]')
        .action(actions.query)
    
    program.option('-n, --name [query...]')
        .action(actions.queryInName)

    program.option('-c, --content [query...]')
        .action(actions.queryInContent)

    program.option('-u, --update')
        .action()

    program.option('-r, --revert [id]')
        .action()
    
    program.option('-g, --glossary')
        .action()

    program.option('')
    

    program.parse(process.argv)
}

module.exports = main