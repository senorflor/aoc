// __dirname does not exist in REPL env.
let dirname
try { dirname = __dirname } catch { dirname = '.' }

// Get input
const input = require('fs').readFileSync(
  dirname + '/input.txt',
  'utf8'
).trim().split('\n').map(l => l.split('-'))

// Create graph of caves
const caveAdjacencyList = new Map(input.flat().map(c => [c, []]))
for (const [c1, c2] of input) {
  caveAdjacencyList.get(c1).push(c2)
  caveAdjacencyList.get(c2).push(c1)
}

// Helper functions
const isSmall = s => s.toLowerCase() == s

// Part 1
const countPaths = (graph, currentCave, visited) => {
  let pathCount = 0
  for (const nextCave of graph.get(currentCave)) {
    if (visited.has(nextCave)) {
      continue
    } else if (nextCave === 'end') {
      // https://www.youtube.com/watch?v=LlhKZaQk860
      pathCount += 1
    } else {
      pathCount += countPaths(
        graph,
        nextCave,
        isSmall(nextCave) ? new Set([...visited, nextCave]) : visited,
      )
    }
  }
  return pathCount
}
console.log(
  countPaths(caveAdjacencyList, 'start', new Set(['start']))
)

// Part 2
const countPathsWithARepeat = (graph, current, visited, doubledBack) => {
  let pathCount = 0
  for (const next of graph.get(current)) {
    if (visited.has(next)) {
      if (!doubledBack && next !== 'start') {
        // https://www.youtube.com/watch?v=cii6ruuycQA
        pathCount += countPathsWithARepeat(graph, next, visited, true)
      } else {
        continue
      }
    }
    else if (next === 'end') {
      pathCount += 1
    }
    else {
      pathCount += countPathsWithARepeat(
        graph,
        next,
        isSmall(next) ? new Set([...visited, next]) : visited,
        doubledBack,
      )
    }
  }
  return pathCount
}
console.log(
  countPathsWithARepeat(caveAdjacencyList, 'start', new Set(['start']), false)
)
