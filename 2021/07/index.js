const input = require('fs').readFileSync(
  __dirname + '/input.txt',
  'utf8'
).trim().split(',').map(
  // Parse here
  // Don't forget to parseInt() / Number() as necessary.
  Number
)

// Part 1
// TODO: Piece together part 1 again since I just hacked in place over part 1 to do part 2.
const min = Math.min(...input)
const max = Math.max(...input)
let minFuel = +Infinity
let pos
for (let i = min; i <= max; i++) {
  const fuel = input.map(
    n => {
      const d = Math.abs(i - n)
      return (d ** 2 + d) / 2
    }
  ).reduce((acc, n) => acc + n)
  if (fuel < minFuel) {
    minFuel = fuel
    pos = i
  }
}
console.log(minFuel)

// Part 2
let part2 = input.length
console.log(part2)
