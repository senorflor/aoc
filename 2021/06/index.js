const input = require('fs').readFileSync(
  __dirname + '/input.txt',
  'utf8'
).trim().split(',')

// Part 1
const initial = input.reduce(
  (acc, n) => { acc[n] += 1; return acc },
  Array(9).fill(0)
)
const spawn = ([f0, f1, f2, f3, f4, f5, f6, f7, f8], days) => {
  if (days < 1) {
    return f0 + f1 + f2 + f3 + f4 + f5 + f6 + f7 + f8
  }
  return spawn([f1, f2, f3, f4, f5, f6, f7 + f0, f8, f0], days - 1)
}
console.log(spawn(initial, 80))

// Part 2
console.log(spawn(initial, 256))
