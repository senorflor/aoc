const input = require('fs').readFileSync(
  __dirname + '/input.txt',
  'utf8'
).trim().split('\n').map(
  l => l.trim().split('').map(Number)
)

// Part 1
const READING_WIDTH = input[0].length
const TOTAL = 2 ** READING_WIDTH - 1 // gamma + epsilon always complement to this total
const placeTotals = Array(READING_WIDTH).fill(0)
input.forEach(reading => {
  for (let i = 0; i < reading.length; i++) {
    placeTotals[i] += reading[i]
  }
})
const threshold = input.length / 2
const gamma = parseInt(
  placeTotals.map(n => n > threshold ? '1' : '0').join(''),
  2
)
const epsilon = TOTAL - gamma
const powerConsumption = gamma * epsilon
console.log(powerConsumption)

// Part 2

// Find correct reading for o2 rating:
let o2 = [...input]
for (let i = 0; i < READING_WIDTH && o2.length > 1; i++) {
  let count = 0
  o2.forEach(reading => {
    count += reading[i] ? 1 : -1
  })
  const bit = (count < 0) ? 0 : 1
  o2 = o2.filter(reading => reading[i] === bit)
}

// Find correct reading for co2 rating:
let co2 = [...input]
for (let i = 0; i < READING_WIDTH && co2.length > 1; i++) {
  let count = 0
  co2.forEach(reading => {
    count += reading[i] ? 1 : -1
  })
  const bit = (count < 0) ? 1 : 0
  co2 = co2.filter(reading => reading[i] === bit)
}

// Calculate final rating
const binaryArrayToNumber = arr => parseInt(arr.join(''), 2)
const o2rating = binaryArrayToNumber(o2[0])
const co2rating = binaryArrayToNumber(co2[0])
const lifeSupportRating = o2rating * co2rating
console.log(lifeSupportRating)
