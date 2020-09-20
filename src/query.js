module.exports = (query, cmd) => {
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