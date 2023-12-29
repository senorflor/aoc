import { open } from 'node:fs/promises'
const input = await open('./input.txt')
const file = await input.readFile('utf-8')
await input.close()

// ------------------------------------------------------------------ Parse

const [directions, graphList] = file.split('\n\n')

const graph = {}
for (const line of graphList.split('\n')) {
  const [curr, adj] = line.split(' = ')
  const [L, R] = adj.match(/([A-Z]{3})/g)
  graph[curr] = {L, R}
}

// ------------------------------------------------------------------ Part 1

let steps = 0
let curr = 'AAA'

normalWalk: while (true) {
  for (const d of directions) {
    steps++
    const next = graph[curr][d]
    if (graph[curr][d] === 'ZZZ') break normalWalk
    curr = next
  }
}

// ------------------------------------------------------------------ Part 2

// Enumerating all states went on indefinitely, so instead, we will find
// each individual cycle length, then find the least common multiple of them
let ghostSteps = 0
const ghostNodes = Object.keys(graph).filter(n => n[2] === 'A')
const nodeSteps = ghostNodes.map(_ => false)

ghostWalk: while (true) {
  for (const d of directions) {
    ghostSteps++
    for (let i = 0; i < ghostNodes.length; i++) {
      const next = graph[ghostNodes[i]][d]
      if (next[2] === 'Z') {
        nodeSteps[i] = ghostSteps
      }
      ghostNodes[i] = next
    }
  }
  if (nodeSteps.every(n => !!n)) break ghostWalk
}

const gcd = (n1, n2) => n2 == 0 ? n1 : gcd (n2, n1 % n2)
const lcm = (n1, n2) =>  n1 / gcd (n1, n2) * n2
const ghostWalk = nodeSteps.reduce(lcm)

// ------------------------------------------------------------------ Solve!

console.log({
  part1: steps,
  part2: ghostWalk
})