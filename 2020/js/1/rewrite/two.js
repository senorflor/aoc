const { createReadStream } = require('fs')
const { createInterface } = require('readline')

// Get nums
const input = createInterface({
  input: createReadStream('./input.txt')
})

const nums = []
const pairs = {}
input.on('line', l => {
  const current = parseInt(l.trim())
  const complement = 2020 - current
  const lookup = pairs[complement]
  if (lookup) {
    const [n1, n2] = lookup
    const product = current * n1 * n2
    console.log(`${current} * ${n1} * ${n2} = ${product}`)
    input.close()
  } else {
    for (const past of nums) {
      pairs[past + current] = [past, current]
    }
    nums.push(current)
  }
})
