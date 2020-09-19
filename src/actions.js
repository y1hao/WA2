module.exports = {
    query: function(name, cmd) {
        console.log('querying: ', ...name)
        if (cmd.title)
            console.log('title')
    },

    update: function(cmd) {
        if (cmd.revert) console.log(cmd.revert)
    }
}