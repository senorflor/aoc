// Returns a trimmed string of the whole input file. No line splitting,
// because in some problems the input "records" are multi-line.
const input = require('fs').readFileSync(
  process.env.PWD + '/input.txt',
  'utf8'
).trim()

module.exports = input
