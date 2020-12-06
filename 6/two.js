const { getRecords } = require('../elvenUtils')

const records = getRecords('./input.txt', {
  delimiter: '\n\n',
  parserFn: r => r
    .trim()
    .split('\n')
    .map(m => new Set(m))
})

fullBallot = new Set('abcdefghijklmnopqrstuvwxyz')
let count = 0
records.forEach(group => {
  const unanimous = group
    .reduce(
      (m1, m2) => new Set(
        [...m1].filter(vote => m2.has(vote))
      ),
      fullBallot
    )
  count += unanimous.size
})
console.log(count)
