const input = require('fs').readFileSync(
  __dirname + '/input.txt',
  'utf8'
).trim().split('\n').map(l => l.split(' '))

// Part 1
let h = 0
let d = 0
input.forEach(([dir, n]) => {
  n = parseInt(n)
  switch (dir) {
    case 'forward':
      h += n
      break;
    case 'up':
      d -= n
      break;
    case 'down':
      d += n
      break;
  }
})
const part1 = d * h
console.log(part1)

// Part 2
h = 0
d = 0
let aim = 0
input.forEach(([dir, n]) => {
  n = parseInt(n)
  switch (dir) {
    case 'forward':
      h += n
      d += aim * n
      break;
    case 'up':
      aim -= n
      break;
    case 'down':
      aim += n
      break;
  }
})
const part2 = h * d
console.log(part2)
