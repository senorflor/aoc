const input = require('./input.js')
  .split('\n')
  .map(Number)

const countDescents = (depths, windowSize) => {
  let count = 0
  for (let x = windowSize; x < depths.length; x++) {
    const start = depths.at(x - windowSize)
    const end = depths.at(x)
    count += end > start ? 1 : 0
  }
  return count
}

// Part 1
console.log(countDescents(input, 1))

// Part 2
console.log(countDescents(input, 3))
