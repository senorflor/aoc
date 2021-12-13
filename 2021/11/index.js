// __dirname does not exist in REPL env.
let dirname
try { dirname = __dirname } catch { dirname = '.' }

// Get input
const cavern = require('fs').readFileSync(
  dirname + '/input.txt',
  'utf8'
).trim().split('\n').map(l => l.split('').map(Number))

// Helpers
const inc = (matrix, [r, c]) => {
  matrix[r][c]++
}
const mForEach = (matrix, fn) => {
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      const cell = matrix[r][c]
      fn(cell, r, c, matrix)
    }
  }
}
const mInc = matrix => {
  mForEach(matrix, (val, r, c, m) => m[r][c] = val + 1)
}
const neighbors = ([r, c], matrix) => [
  [r - 1, c - 1],
  [r - 1, c],
  [r - 1, c + 1],
  [r, c - 1],
  [r, c + 1],
  [r + 1, c - 1],
  [r + 1, c],
  [r + 1, c + 1],
].filter(([r, c]) => r >= 0 && c >= 0 && r < matrix.length && c < matrix[0].length)
// Work around lack of array of values identity in JS
const ptStr = ([r, c]) => `${r},${c}`

// Part 1 and 2
let totalFlashes = 0
let flashedEnough = false
for (let step = 1; step <= 100 || !flashedEnough; step++) {
  mInc(cavern)
  // Flashdance https://www.youtube.com/watch?v=6Vx4J_NtNPk
  const flashed = new Set()
  while (true) {
    let previousFlashes = totalFlashes
    mForEach(cavern, (o, r, c) => {
      const ptKey = ptStr([r, c])
      if (o > 9 && !flashed.has(ptKey)) {
        newFlash = true
        totalFlashes += 1
        flashed.add(ptKey)
        neighbors([r, c], cavern).map(pt => inc(cavern, pt))
      }
    })
    if (totalFlashes == previousFlashes) break
  }
  // Rest up, octopuses.
  mForEach(cavern, (o, r, c, cavern) => {
    if (o > 9) cavern[r][c] = 0
  })

  // Part 1
  if (step === 100) {
    console.log(`Part 1: ${totalFlashes}`)
  }
  // Part 2
  if (flashed.size == 100) {
    console.log(`Part 2: ${step}`)
    flashedEnough = true
  }
}
