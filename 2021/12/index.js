// __dirname does not exist in REPL env.
let dirname
try { dirname = __dirname } catch { dirname = '.' }

// Get input
const input = require('fs').readFileSync(
  dirname + '/input.txt',
  'utf8'
).trim().split('\n').map(l => l.split('-'))

// Create map of caves
const caves = new Map(input.flat().map(c => [c, []]))
for (const [c1, c2] of input) {
  caves.get(c1).push(c2)
  caves.get(c2).push(c1)
}

// Helper functions
const isSmall = s => s.toLowerCase() == s
const sum = (a, b) => a + b

// Part 1
const countPaths = (caves, here, visited) => {
  return (here === 'end')
    ? 1
    : caves.get(here)
      .filter(
        next => !visited.has(next)
      ).map(
        next => countPaths(
          caves,
          next,
          isSmall(next) ? new Set([...visited, next]) : visited)
      ).reduce(sum, 0)
}
console.log(
  countPaths(caves, 'start', new Set(['start']))
)

// Part 2
const countPathsWithARepeat = (caves, here, visited, looped) => {
  return (here === 'end')
    ? 1
    : caves.get(here)
      .filter(
        next =>
          !visited.has(next) ||
          (!looped && next !== 'start')
      ).map(
        next => countPathsWithARepeat(
          caves,
          next,
          isSmall(next) ? new Set([...visited, next]) : visited,
          visited.has(next) ? true : looped)
      ).reduce(sum, 0)
}
console.log(
  countPathsWithARepeat(caves, 'start', new Set(['start']), false)
)
