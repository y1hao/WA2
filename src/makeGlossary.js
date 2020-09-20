const cheerio = require('cheerio')

module.exports = (content) => {
    const $ = cheerio.load(content)
    const result = []
    const titles = []
    const descriptions = []
    const dts = $('dt')
    const dds = dts.next()
    dts.each(function(_, e) {
        const title = $(e).text().replace(/\s\s+/g, ' ').trim()
        titles.push(title)
    })
    dds.each(function(_, e) {
        const description = $(e).text().replace(/\s\s+/g, ' ').trim()
        descriptions.push(description)
    })
    for (let i = 0; i < titles.length; i++) {
        result.push({title: titles[i], description: descriptions[i]})
    }
    transform(result)
    return result
}

function transform(result) {
    for (const record of result) {
        record.names = [record.title]
        if (record.title.includes('(')) {
            record.names.push(record.title.replace(/ \(.+\)/, ''))
        }
    }

    for (let i = result.length - 1; i >= 0; i--) {
        const record = result[i]
        const description = record.description
        if (description.startsWith('See ')) {
            const link = description.replace('See ', '').replace('.', '')
            for (r of result) {
                if (r.title === link) {
                    r.names.push(record.title)
                    result.splice(i, 1)
                    break;
                }
            }
        }
    }
    
    for (const record of result) {
        const pieces = record.description.split('See also ')
        if (pieces.length > 1) {
            record.description = pieces[0].trim()
            record.references = []
            for (let i = 1; i < pieces.length; i++) {
                record.references.push(pieces[i].replace(/\.\s*$/, ''))
            }
        }
    }
}