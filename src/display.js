const BOLD = '\u001b[1m'
const UNDERLINE = '\u001b[4m'
const YELLOW = '\u001b[33m'
const CYAN = '\u001b[36m'
const BLUE = '\u001b[34m'
const RESET = '\u001b[0m'

function single(item) {
    console.log()

    console.group()
    console.log(BOLD + UNDERLINE + BLUE + item.title + RESET)

    console.log()
    console.log(YELLOW + 'Description:' + RESET)

    console.group()
    console.log()
    console.log(item.description)
    console.groupEnd()

    if (item.names.length > 1) {
        console.log()
        console.log(YELLOW + 'Also known as:' + RESET)
        console.log()
        console.group() 
        for (const n of item.names.sort()) {
            console.log(CYAN + n + RESET)
        }
        console.groupEnd()
    }
    if (item.references) {
        console.log()
        console.log(YELLOW + 'References:' + RESET)
        console.log()
        console.group()
        for (const r of item.references) {
            if (r.startsWith('https://')) {
                console.log(r)
            } else {
                console.log(CYAN + r + RESET)
            }
        }
        console.groupEnd()
    }
    console.groupEnd()
    console.log()
}

function list(items) {
    console.group()
    console.log(CYAN)
    for (const item of items) {
        console.log(item)
    }
    console.log()
    console.log(`${YELLOW}${items.length} item(s) found in total.${RESET}`)
    console.log()
    console.groupEnd()
}

module.exports = { single, list }