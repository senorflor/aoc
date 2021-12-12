// __dirname does not exist in REPL env.
let dirname
try { dirname = __dirname } catch { dirname = '.' }

// Get input
const input = require('fs').readFileSync(
  dirname + '/input.txt',
  'utf8'
).trim().split('\n').map(
  l => l.split('').map(Number)
)

// Part 1
let risk = 0
let lowPoints = [] // for part 2
for (let row = 0; row < input.length; row++) {
  for (let col = 0; col < input[row].length; col++) {
    let [up, left, down, right] = [row - 1, col - 1, row + 1, col + 1]
    if (
      (up >= 0 && (input[up][col] <= input[row][col])) ||               // ⬆️
      (left >= 0 && (input[row][left] <= input[row][col])) ||           // ⬅️
      (down < input.length && input[down][col] <= input[row][col]) ||   // ⬇️
      (right < input[row].length && input[row][right] <= input[row][col]) // ➡️
    ) continue
    lowPoints.push([row, col])
    risk += input[row][col] + 1
  }
}
console.log(risk)

// Part 2
const pointString = ([row, col]) => `${row},${col}`
const checkAround = (visited, [row, col]) => {
  const [up, left, down, right] = [row - 1, col - 1, row + 1, col + 1]
  const [upPos, leftPos, downPos, rightPos] = [
    [up, col],
    [row, left],
    [down, col],
    [row, right]
  ]
  if (up >= 0 && input[up][col] < 9 && !visited.has(pointString(upPos))) {
    visited.add(pointString(upPos))
    checkAround(visited, upPos)
  }
  if (left >= 0 && input[row][left] < 9 && !visited.has(pointString(leftPos))) {
    visited.add(pointString(leftPos))
    checkAround(visited, leftPos)
  }
  if (down < input.length && input[down][col] < 9 && !visited.has(pointString(downPos))) {
    visited.add(pointString(downPos))
    checkAround(visited, downPos)
  }
  if (right < input[row].length && input[row][right] < 9 && !visited.has(pointString(rightPos))) {
    visited.add(pointString(rightPos))
    checkAround(visited, rightPos)
  }
}

const basinSizes = []
for (let [row, col] of lowPoints) {
  const basinSet = new Set()
  basinSet.add(pointString([row, col]))
  checkAround(basinSet, [row, col])
  basinSizes.push(basinSet.size)
}
console.log(
  basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1)
)
