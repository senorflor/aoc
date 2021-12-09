const input = require('fs').readFileSync(
  __dirname + '/input.txt',
  'utf8'
).trim().split(',')

// Part 1
const fishCount = (arr) => arr.reduce((acc, curr) => acc + curr, 0)
const initial = input.reduce(
  (acc, n) => { acc[n] += 1; return acc },
  Array(9).fill(0)
)
for (let i = 0; i < 80; i++) {
  initial[(i + 7) % 9] += initial[i % 9]
}
console.log(fishCount(initial))

// Part 2; retain results of previous part for silly small efficieny gain
// Note the re-starting iteration, 81, mod 9, is 0.
for (let i = 80; i < 256; i++) {
  initial[(i + 7) % 9] += initial[i % 9]
}
console.log(fishCount(initial))
