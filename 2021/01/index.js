const input = require('fs').readFileSync(
  __dirname + '/input.txt',
  'utf8'
).trim().split('\n').map(Number)

// Part 1
let ans1 = 0
for (let i = 1; i < input.length; i++) {
  ans1 += (input[i] > input[i - 1] ? 1 : 0)
}
console.log(ans1)

// Part 2
let ans2 = 0
for (let j = 3; j < input.length; j++) {
  ans2 += input[j] > input[j - 3] ? 1 : 0
}
console.log(ans2)
