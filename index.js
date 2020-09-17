const program = require('commander')
const package = require('./package.json')

function main() {
    program.version(package.version)
    .parse(process.argv)

}

module.exports = main