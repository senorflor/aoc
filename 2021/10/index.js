// __dirname does not exist in REPL env.
let dirname
try { dirname = __dirname } catch { dirname = '.' }

// Get input
const input = require('fs').readFileSync(
  dirname + '/input.txt',
  'utf8'
).trim().split('\n')

// Part 1
const errorScores = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}
const completionScores = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
}
const pairs = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
}

let syntaxErrorScore = 0
const autocompleteScoreList = []
top:
for (let line of input) {
  const stack = []
  for (let char of line) {
    if (pairs[char]) {
      if (!stack.length || stack.pop() !== pairs[char]) {
        syntaxErrorScore += errorScores[char]
        continue top // so we don't attempt autocomplete
      }
    } else {
      stack.push(char)
    }
  }
  let autompleteScore = 0
  for (let char of stack.reverse()) {
    autompleteScore = autompleteScore * 5 + completionScores[char]
  }
  autocompleteScoreList.push(autompleteScore)
}
console.log(syntaxErrorScore)

// Part 2
const sortedScores = [...autocompleteScoreList].sort((a, b) => a - b)
const midpoint = Math.floor(sortedScores.length / 2)
console.log(sortedScores[midpoint])
