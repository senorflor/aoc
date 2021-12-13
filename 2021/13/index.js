// __dirname does not exist in REPL env.
let dirname
try { dirname = __dirname } catch { dirname = '.' }

// Get input
const input = require('fs').readFileSync(
  dirname + '/input.txt',
  'utf8'
).trim().split('\n\n').map(
  l => l.trim().split('\n')
)

// Helpers

const stringify = point => point.toString()
const unique = (points) => [...new Set(
  points.map(stringify))
].map(
  pt => pt.split(',').map(n => +n)
)
const reflect = ([x, y], [dir, n]) => {
  return (dir === 'x')
    ? [
      x > n ? (2 * n - x) : x,
      y
    ] : [
      x,
      y > n ? (2 * n - y) : y,
    ]
}

const fold = (points, folds) => {
  let foldedPoints = [...points]
  folds.forEach(fold => {
    foldedPoints = unique(
      foldedPoints.map(pt => reflect(pt, fold))
    )
  })
  return foldedPoints
}

// Part 1

const points = input[0].map(pt => pt.split(',').map(n => +n))
const folds = input[1].map(l =>
  l.split(' ')[2].split('=')
).map(([dir, n]) => [dir, +n])

console.log(
  fold(points, folds.slice(0, 1)).length
)

// Part 2

const fullyFoldedPoints = fold(points, folds)

// Print the ASCII art code
const pointSet = new Set(fullyFoldedPoints.map(stringify))
const codeWidth = Math.max(...fullyFoldedPoints.map(pt => pt[0]))
const codeHeight = Math.max(...fullyFoldedPoints.map(pt => pt[1]))
for (let y = 0; y <= codeHeight; y++) {
  for (let x = 0; x <= codeWidth; x++) {
    process.stdout.write(
      pointSet.has([x, y].toString())
        ? '#'
        : ' '
    )
  }
  console.log()
}
