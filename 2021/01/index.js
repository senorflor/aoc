const input = require('fs').readFileSync(
  __dirname + '/input.txt',
  'utf8'
).trim().split('\n').map(Number)

// Part 1
let ans1 = 0
for (let i = 1; i < input.length; i++) {
  const start = input[i - 1]
  const end = input[i]
  ans1 += end > start ? 1 : 0
}
console.log(ans1)

// Part 2
let ans2 = 0
for (let i = 3; i < input.length; i++) {
  const start = input[i - 3]
  const end = input[i]
  ans2 += end > start ? 1 : 0
}
console.log(ans2)
