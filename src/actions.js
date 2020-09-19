const update = require('./update')

function queryHandler(query, cmd) {
    if (cmd.title) {
        queryInTitle(query)
    }
    if (cmd.content) {
        queryInContent(query)
    }
    if (!cmd.title && !cmd.content) {
        queryExact(query)
    }
}

function queryExact(query) {
    console.log('querying: ', query)
}

function queryInTitle(query) {
    console.log('querying in title: ', query)
}

function queryInContent(query) {
    console.log('querying in content: ', query)
}

function acronymHandler(acronym) {
    console.log('querying for acronym: ', acronym)
}

function listHandler(initial) {
    console.log('listing services with initial: ', initial)
}

function randomHandler() {
    console.log('showing a random service')
}

function updateHandler(cmd) {
    if (cmd.list) {
        update.list()
    } else if (cmd.revert) {
        update.use(cmd.revert)
    } else {
        update.create()
    }
}

module.exports = {
    query: queryHandler,
    update: updateHandler,
    acronym: acronymHandler,
    list: listHandler,
    random: randomHandler
}