const { getRecords } = require('../elvenUtils')

const allNums = getRecords('input.txt', {
  parserFn: l => parseInt(l, 10)
})

const preamble = new Set(allNums.slice(0,25))
const rest = allNums.slice(25)
let notEntailed
// Part 1
for (const num of rest) {
  if ([...preamble.values()]
    .some(
      i => i < num/2 && 
      preamble.has(num - i)
    )
  ) {
      const oldest = preamble.values().next().value
      preamble.delete(oldest)
      preamble.add(num)
  } else {
    notEntailed = num
    break
  }
}
console.log(notEntailed)

// Part 2
for (let i = 0; i < allNums.length; i++) {
  let sum = 0
  let min = Number.MAX_SAFE_INTEGER
  let max = 0
  for (let j = i; sum < notEntailed; j++) {
    const current = allNums[j]
    sum += current
    min = Math.min(min, current)
    max = Math.max(max, current)
    if (sum == notEntailed) {
      console.log(min, max)
      console.log(min + max)
      process.exit()
    }
  }
}