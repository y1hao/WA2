const program = require('commander')
const package = require('./package.json')
const actions = require('./src/actions')

function main() {
    program.version(package.version, '-v, --version')
        .name('wa2')

    program.arguments('[query...]')
        .option('-t, --title')
        .option('-c, --content')
        .option('-l, --list [letter]')
        .option('-r, --random')
        .action(actions.query)

    program.command('update')
        .option('-l, --list')
        .option('-r, --revert [id]')
        .action(actions.update)

    program.parse(process.argv)
}

module.exports = main