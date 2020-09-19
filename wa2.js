const program = require('commander')
const package = require('./package.json')
const actions = require('./src/actions')

function main() {
    program.version(package.version, '-v, --version')
        .name('wa2')

    program.arguments('[query...]')
        .usage('[service name or acronym] - query for the specified service in AWS glossary')
        .option('-a, --acronym', 'search for items with the queried word as its acronym')
        .option('-t, --title', 'search for items containing the queried word(s) in the title')
        .option('-c, --content', 'search for items containing the queried word(s) in the content')
        .option('-l, --list [letter]', 'list items by initial letter')
        .option('-r, --random', 'show a random item')
        .action(actions.query)

    program.command('update')
        .usage('- generate a new glossary list from the AWS glossary page, to keep the search results up to date')
        .option('-s, --show', 'show all the available versions of glossaries')
        .option('-R, --revert [id]', 'revert to a particular version of glossary, or the last one if [id] is not given')
        .action(actions.update)

    program.parse(process.argv)
}

module.exports = main