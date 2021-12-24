const input = require('./input.js')
  .split('\n')
  .map(
    l => l.split(' ')
  )

// Part 1
const pilotSub1 = (commands) => {
  let h = 0
  let d = 0
  commands.forEach(([dir, n]) => {
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
  return h * d
}

console.log(pilotSub1(input))

// Part 2
const pilotSub2 = (commands) => {
  h = 0
  d = 0
  let aim = 0
  commands.forEach(([dir, n]) => {
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
  return h * d
}

console.log(pilotSub2(input))
