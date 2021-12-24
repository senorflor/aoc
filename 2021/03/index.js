const input = require('./input.js')
  .split('\n')
  .map(l => l
    .trim()
  )
// Helpers
const binaryArrayToNumber = arr => parseInt(arr.join(''), 2)
const ZERO = 48
const ONE = 49

// Part 1
const powerConsumption = (readings) => {
  const threshold = readings.length / 2
  const readingLength = readings[0].length
  const bitwisePowerConsumption = readings
    .reduce(
      (totals, r) => totals.map((total, place) => total += (r.codePointAt(place) == ONE) ? 1 : 0),
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
  let o2 = [...readings]
  let co2 = [...readings]
  for (let i = 0; i < readings[0].length; i++) {
    if (o2.length > 1) {
      let count = 0
      o2.forEach(r => {
        count += (r.codePointAt(i) == ONE) ? 1 : -1
      })
      const bit = (count < 0) ? ZERO : ONE
      o2 = o2.filter(r => r.codePointAt(i) == bit)
    }
    if (co2.length > 1) {
      let count = 0
      co2.forEach(r => {
        count += (r.codePointAt(i)) == ONE ? 1 : -1
      })
      const bit = (count < 0) ? ONE : ZERO
      co2 = co2.filter(r => r.codePointAt(i) == bit)
    }
  }
  const o2rating = parseInt(o2[0], 2)
  const co2rating = parseInt(co2[0], 2)

  return o2rating * co2rating
}

console.log(lifeSupportRating(input))
