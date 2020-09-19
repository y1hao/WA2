const program = require('commander')
const package = require('./package.json')
const actions = require('./src/actions')

function main() {
    program.version(package.version, '-v, --version')
        .name('wa2')

    program.arguments('<query...>')
        .usage('<query...> - query for the specified service or its abbreviation in AWS glossary')
        .option('-t, --title', 'search for items containing the queried word(s) in the title')
        .option('-c, --content', 'search for items containing the queried word(s) in the content')
        .action(actions.query)

    program.command('update')
        .usage('- generate a new glossary list from the AWS glossary page, to keep the search results up to date')
        .option('-l, --list', 'list all the available versions of glossaries')
        .option('-r, --revert [id]', 'revert to a particular version of glossary, or the last one if [id] is not given')
        .action(actions.update)

    program.command('random')
        .usage('- show a random item')
        .action(actions.random)

    program.command('list [letter]')
        .usage('[initial letter] - list items with the initial letter')
        .action(actions.list)

    program.command('acronym <query>')
        .usage('search for items with the specified acronym')
        .action(actions.acronym)

    program.parse(process.argv)
}

module.exports = main