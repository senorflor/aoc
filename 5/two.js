const { getRecords } = require('../elvenUtils')

const records = getRecords('./input.txt', {})

const ids = records
  .map(seat => seat
    .replaceAll(/[FL]/g, 0)
    .replaceAll(/[BR]/g, 1)
  )
  .map(n => parseInt(n, 2))
  .sort((a, b) => a-b)

// We be hacking.
let prev = 47
for (let id of ids) {
  if ((id - prev) === 2) {
    console.log(prev, id)
    console.log(prev + 1)
    process.exit(0)
  }
  prev = id
}
