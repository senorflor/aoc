const { getRecords } = require('../elvenUtils')

const grid = getRecords('./input.txt', {
  parserFn: l => l.trim().split("")
})
const height = grid.length
const width = grid[0].length

let trees = 0
for (let [x,y] = [0,0]; y < height; y++) {
  if (grid[y][x] === '#') {
    trees++
  }
  x = (x+3) % width
}
console.log(trees)
