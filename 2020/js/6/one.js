const { getRecords } = require('../elvenUtils')

const records = getRecords('./input.txt', {
  delimiter: '\n\n',
  // Mash group together into one line, no newlines:
  parserFn: r => r.replaceAll('\n', '')
})

let count = 0
records.forEach(group => {
  count += new Set(group).size
})
console.log(count)
