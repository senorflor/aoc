const { getRecords } = require('../elvenUtils')

const adapters = getRecords('./input.txt', {
  parserFn: op => parseInt(op)
})
// Could add a sortFn to getRecords, but feels rare so far.
adapters.sort((a, b) => a-b)

// Add outlet and device joltages
const [lastAdapter] = adapters.slice(-1)
const deviceJoltage = lastAdapter + 3
const joltages = [0, ...adapters, deviceJoltage]

// Part 1
let [ones, threes] = [0, 0]
for (let [i, j] = [0, 1]; j < joltages.length; i++, j++) {
  const diff = joltages[j] - joltages[i]
  if (diff == 1) ones ++
  if (diff == 3) threes ++
}
console.log(ones * threes)

// Part 2: Data super weird! Gaps of 1 or 3 only. This allows greedy algo: gaps of 3 divide adapter
// stream into independent segments of 1 jolt diffs, which have OIES A000073, aka Tribonacci,
// configurations
let prev = -1
let currSegment = []
let configurations = 1 // multiplicative identity
const tribonacci = [0,1,1,2,4,7,13,24]
for (let k = 0; k < joltages.length; k++) {
  const curr = joltages[k]
  if (curr - prev == 1) {
    currSegment.push(curr)
  } else {
    const currConfigs = tribonacci[currSegment.length]
    configurations *= currConfigs
    currSegment = [curr]
  }
  prev = curr
}
console.log(configurations)
