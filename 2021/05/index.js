// __dirname does not exist in REPL env.
let dirname
try { dirname = __dirname } catch { dirname = '.' }

// Get input
const input = require('fs').readFileSync(
  dirname + '/input.txt',
  'utf8'
).trim().split('\n').map(
  l => l.split(' ->').map(pos => pos.trim().split(',').map(Number))
)

// Part 1
// Helpers:
const minMax = ([[x1, y1], [x2, y2]]) => ({
  xmax: Math.max(x1, x2),
  xmin: Math.min(x1, x2),
  ymax: Math.max(y1, y2),
  ymin: Math.min(y1, y2),
})

const linePts = (line) => {
  const { xmin, xmax, ymin, ymax } = minMax(line)
  const points = []
  for (let x = xmin; x <= xmax; x++) {
    for (let y = ymin; y <= ymax; y++) {
      points.push(`${x},${y}`)
    }
  }
  return points
}

// DOIT
const axilinearLines = input.filter(
  ([[x1, y1], [x2, y2]]) => x1 === x2 || y1 === y2
)
let overlaps = 0
const overlapCounts = new Map()
for (line of axilinearLines) {
  const points = linePts(line)
  for (let point of points) {
    const count = overlapCounts.get(point) || 0
    if (count === 1) {
      overlaps += 1
    }
    overlapCounts.set(point, count + 1)
  }
}
console.log(overlaps)

// Part 2
const linePts2 = ([[x1, y1], [x2, y2]]) => {
  const { xmin, xmax, ymin, ymax } = minMax(line)
  const points = []
  if (xmin === xmax || ymin === ymax) {
    // Axilinear line
    for (let x = xmin; x <= xmax; x++) {
      for (let y = ymin; y <= ymax; y++) {
        points.push(`${x},${y}`)
      }
    }
  } else if ((x1 < x2 && y1 < y2) || (x1 > x2 && y1 > y2)) {
    // Positive diagonal
    for (let n = 0; n <= xmax - xmin; n++) {
      points.push(`${xmin + n},${ymin + n}`)
    }
  } else {
    // Negative diagonal 
    for (let n = 0; n <= xmax - xmin; n++) {
      points.push(`${xmin + n},${ymax - n}`)
    }
  }
  return points
}
let allOverlaps = 0
const allOverlapCounts = new Map()
for (line of input) {
  const points = linePts2(line)
  for (let point of points) {
    const count = allOverlapCounts.get(point) || 0
    if (count === 1) {
      allOverlaps += 1
    }
    allOverlapCounts.set(point, count + 1)
  }
}
console.log(allOverlaps)
