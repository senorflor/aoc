const { getRecords } = require('../elvenUtils')

const ops = getRecords('./input.txt', {
  parserFn: op => op.split(' ')
})

let curr = 0
let acc = 0
const visited = new Set()

while (!visited.has(curr)) {
  const [op, n] = ops[curr]
  const arg = parseInt(n)
  visited.add(curr)
  if (op === 'nop') {
    curr++
  } else if (op === 'acc') {
    acc += arg
    curr++
  } else {
    curr += arg
  }
}

console.log(acc)