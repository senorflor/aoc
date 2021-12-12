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
const isSmall = s => s.toLowerCase() == s

// Part 1
const visited = new Set(['start'])
let pathCount = 0
const search = (graph, current, visited) => {
  for (const next of graph.get(current)) {
    if (visited.has(next)) {
      continue
    } else if (next === 'end') {
      pathCount++
    } else {
      search(
        graph,
        next,
        isSmall(next) ? new Set([...visited, next]) : visited,
      )
    }
  }
}
search(caveAdjacencyList, 'start', visited)
console.log(pathCount)

// Part 2
const visited2 = new Set(['start'])
let pathCount2 = 0
const search2 = (graph, current, visited, doubledBack) => {
  for (const next of graph.get(current)) {
    if (visited.has(next)) {
      if (!doubledBack && next !== 'start') {
        search2(graph, next, visited, true)
      } else {
        continue
      }
    }
    else if (next === 'end') {
      pathCount2++
    }
    else {
      search2(
        graph,
        next,
        isSmall(next) ? new Set([...visited, next]) : visited,
        doubledBack,
      )
    }
  }
}
search2(caveAdjacencyList, 'start', visited2, false)
console.log(pathCount2)
