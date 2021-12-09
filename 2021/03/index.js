const input = require('fs').readFileSync(
  __dirname + '/input.txt',
  'utf8'
).trim().split('\n').map(
  l => l.trim().split('').map(s => parseInt(s))
)
// Part 1
let acc = Array(12).fill(0)
input.forEach(row => {
  for (let i = 0; i < row.length; i++) {
    acc[i] += row[i]
  }
})
const threshold = input.length / 2
const gamma = parseInt(
  acc.map(n => n > threshold ? '1' : '0').join(''),
  2
)
const TOTAL = 2 ** 12 - 1
const epsilon = TOTAL - gamma
const part1 = gamma * epsilon
console.log(part1)

// Part 2
let o2 = [...input]
let co2 = [...input]
for (let i = 0; i < 12 && o2.length > 1; i++) {
  let count = 0
  o2.forEach(row => {
    count += row[i] ? 1 : -1
  })
  let bit = (count < 0) ? 0 : 1
  o2 = o2.filter(row => row[i] === bit)
}
for (let i = 0; i < 12 && co2.length > 1; i++) {
  let count = 0
  co2.forEach(row => {
    count += row[i] ? 1 : -1
  })
  let bit = (count < 0) ? 1 : 0
  co2 = co2.filter(row => row[i] === bit)
}
const o2rating = parseInt(o2[0].join(''), 2)
const co2rating = parseInt(co2[0].join(''), 2)
const part2 = o2rating * co2rating
console.log(part2)
