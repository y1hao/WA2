const program = require('commander')
const package = require('./package.json')
const actions = require('./src/actions')

function main() {
    program.version(package.version, '-v, --version')
        .name('wa2')

    program.arguments('<query...>')
        .usage('[options] <query...>')
        .description('Query for the specified service or its abbreviation in AWS glossary')
        .option('-t, --title', 'Search for items containing the queried word(s) in the title')
        .option('-c, --content', 'Search for items containing the queried word(s) in the content')
        .action(actions.query)

    program.command('update')
        .description('Generate a new glossary list from the AWS glossary page, to keep the search results up to date')
        .option('-l, --list', 'List all the available versions of glossaries')
        .option('-r, --revert [id]', 'Revert to a particular version of glossary, or the last one if [id] is not given')
        .option('-d, --delete <id>', 'Delete a particular version of glossary')
        .action(actions.update)

    program.command('random')
        .description('Show a random item')
        .action(actions.random)

    program.command('list <initial>')
        .description('List items with the initial letter')
        .action(actions.list)

    program.parse(process.argv)
}

module.exports = main