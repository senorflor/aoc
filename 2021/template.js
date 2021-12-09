// __dirname does not exist in REPL env.
let dirname
try { dirname = __dirname } catch { dirname = '.' }

// Get input
const input = require('fs').readFileSync(
  dirname + '/input.txt',
  'utf8'
).trim().split('\n').map(
  // Parse here
  // Don't forget to parseInt() / Number() as necessary.
  l => l
)

// Part 1
let part1 = input.length
console.log(part1)

// Part 2
let part2 = input.length
console.log(part2)
