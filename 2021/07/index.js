const input = require('fs').readFileSync(
  __dirname + '/input.txt',
  'utf8'
).trim().split(',').map(Number)

// Part 1
const min = Math.min(...input)
const max = Math.max(...input)
let minFuel1 = +Infinity
let minFuel2 = +Infinity
for (let i = min; i <= max; i++) {
  const [fuel1, fuel2] = input.map(
    n => {
      const d = Math.abs(i - n)
      return [d, (d ** 2 + d) / 2]
    }
  ).reduce(([acc1, acc2], [f1, f2]) => [acc1 + f1, acc2 + f2])
  if (fuel1 < minFuel1) {
    minFuel1 = fuel1
  }
  if (fuel2 < minFuel2) {
    minFuel2 = fuel2
  }
}
console.log(minFuel1)

// Part 2
console.log(minFuel2)
