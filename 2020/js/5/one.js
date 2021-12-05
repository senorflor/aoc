const { getRecords } = require('../elvenUtils')

const records = getRecords('./input.txt', {})

const highest = records
  .map(seat => seat
    .replaceAll(/[FL]/g, 0)
    .replaceAll(/[BR]/g, 1)
  )
  .map(n => parseInt(n, 2))
  .reduce((id1, id2) => Math.max(id1, id2), '0')

console.log(highest)
