const { getLineArray } = require('../elvenUtils')

const grid = getLineArray('./input.txt', {
  parserFn: l => l.trim().split("")
})
const height = grid.length
const width = grid[0].length
const jumps = [[1,1], [3,1], [5,1], [7,1], [1,2]]

let treeProduct = 1
for (const [right, down] of jumps) {
  let trees = 0
  for (let [x,y] = [0,0]; y < height;) {
    if (grid[y][x] === '#') {
      trees++
    }
    y += down
    x = (x + right) % width
  }
  treeProduct *= trees
}
console.log(treeProduct)
