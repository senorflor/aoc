// __dirname does not exist in REPL env.
let dirname
try { dirname = __dirname } catch { dirname = '.' }

// Get input
const input = require('fs').readFileSync(
  dirname + '/input.txt',
  'utf8'
).trim().split('\n').map(
  // Parse here
  // Don't forget to parseInt() / Number() as necessary.
  l => l.split('').map(Number)
)

// Part 1
const neighbors = ([x, y]) => [
  [x - 1, y - 1],
  [x - 1, y],
  [x - 1, y + 1],
  [x, y - 1],
  [x, y + 1],
  [x + 1, y - 1],
  [x + 1, y],
  [x + 1, y + 1],
].filter(([x, y]) => x >= 0 && y >= 0 && x < input.length && y < input[0].length)

const ptStr = ([x, y]) => `${x},${y}`

const inc = (cavern, [x, y]) => {
  cavern[x][y]++
}

let totalFlashes = 0
for (let i = 0; i < 100000; i++) {
  const flashed = new Set()
  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[0].length; y++) {
      inc(input, [x, y])
    }
  }
  while (true) {
    let newFlash = false
    for (let x = 0; x < input.length; x++) {
      for (let y = 0; y < input[0].length; y++) {
        const ptKey = ptStr([x, y])
        if (input[x][y] > 9 && !flashed.has(ptKey)) {
          newFlash = true
          totalFlashes += 1
          flashed.add(ptKey)
          neighbors([x, y]).map(pt => inc(input, pt))
        }
      }
    }
    if (!newFlash) break
  }
  if (flashed.size == 100) {
    // Part 2
    console.log(`Part 2: ${i + 1}`)
    break
  }
  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[0].length; y++) {
      if (input[x][y] > 9) input[x][y] = 0
    }
  }
  if (i === 99) {
    console.log(`Part 1: ${totalFlashes}`)
  }
}
