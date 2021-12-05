const { getRecords } = require('../elvenUtils')

const directions = getRecords('./input.txt', {
  parserFn: d => [d.substring(0,1), parseInt(d.substring(1))]
})

const manhattan = (x, y) => Math.abs(x) + Math.abs(y)

// Part 1
const mod360 = (d) => ((d % 360) + 360) % 360
let [h, v, dir] = [0, 0, 0]
for (let [d,n] of directions) {
  switch(d) {
  case 'W':
    h -= n
    break
  case 'E':
    h += n
    break
  case 'S':
    v -= n
    break
  case 'N':
    v += n
    break
  case 'L':
    dir += n
    dir = mod360(dir)
    break
  case 'R':
    dir -= n
    dir = mod360(dir)
    break
  case 'F':
    switch(dir) {
      case 0:
        h += n
        break
      case 90:
        v += n
        break
      case 180:
        h -= n
        break
      case 270:
        v -= n
        break
    }
    break
  }
}
console.log(manhattan(h, v))

// Part 2
let [x, y] = [0, 0];
[h, v] = [10, 1]
for (let [d,n] of directions) {
  switch(d) {
  case 'W':
    h -= n
    break
  case 'E':
    h += n
    break
  case 'S':
    v -= n
    break
  case 'N':
    v += n
    break
  case 'L':
    switch(n) {
      case 90:
        [h, v] = [-v, h]
        break
      case 180:
        [h, v] = [-h, -v]
        break
      case 270:
        [h, v] = [v, -h]
        break
    }
    break
  case 'R':
    switch(n) {
      case 90:
        [h, v] = [v, -h]
        break
      case 180:
        [h, v] = [-h, -v]
        break
      case 270:
        [h, v] = [-v, h]
        break
    }
    break
  case 'F':
    x += n * h
    y += n * v
    break
  }
}
console.log(manhattan(x, y))
