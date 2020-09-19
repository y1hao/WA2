const update = require('./update')

function queryHandler(query, cmd) {
    if (cmd.list) {
        listItems(query)
    } else if (cmd.random) {
        random(cmd)
    } else {
        if (cmd.title) {
            queryTitle(query)
        }
        if (cmd.content) {
            queryContent(query)
        }
        if (!cmd.title && !cmd.content) {
            if (cmd.acronym) {
                queryAcronym(query)
            } else {
                queryExact(query)
            }
        }
    }
}

function queryExact(query) {
    console.log('querying: ', query)
}

function queryTitle(query) {
    console.log('querying in title: ', query)
}

function queryContent(query) {
    console.log('querying in content: ', query)
}

function queryAcronym(acronym) {
    console.log('querying for acronym: ', acronym)
}

function listItems(initial) {
    console.log('listing services with initial: ', initial)
}

function random() {
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
    update: updateHandler
}