const input = require('./input.js')
  .split('\n')
  .map(l => l
    .trim()
    .split('')
    .map(Number)
  )
// Helpers
const binaryArrayToNumber = arr => parseInt(arr.join(''), 2)

// Part 1
const powerConsumption = (readings) => {
  const threshold = readings.length / 2
  const readingLength = readings[0].length
  const bitwisePowerConsumption = readings
    .reduce(
      (totals, r) => totals.map((total, place) => total += r.at(place)),
      Array(readingLength).fill(0)
    )
    .map(
      count => count > threshold ? '1' : '0'
    )
  const gamma = binaryArrayToNumber(bitwisePowerConsumption)
  const epsilon = 2 ** readingLength - 1 - gamma
  return gamma * epsilon
}

console.log(powerConsumption(input))

// Part 2
const lifeSupportRating = (readings) => {
  let o2 = [...readings.keys()]
  let co2 = [...readings.keys()]
  for (let i = 0; i < readings[0].length; i++) {
    if (o2.length > 1) {
      let count = 0
      o2.forEach(r => {
        count += readings[r][i] ? 1 : -1
      })
      const bit = (count < 0) ? 0 : 1
      o2 = o2.filter(r => readings[r][i] === bit)
    }
    if (co2.length > 1) {
      let count = 0
      co2.forEach(r => {
        count += readings[r][i] ? 1 : -1
      })
      const bit = (count < 0) ? 1 : 0
      co2 = co2.filter(r => readings[r][i] === bit)
    }
  }
  const o2rating = binaryArrayToNumber(readings[o2[0]])
  const co2rating = binaryArrayToNumber(readings[co2[0]])

  return o2rating * co2rating
}

console.log(lifeSupportRating(input))
