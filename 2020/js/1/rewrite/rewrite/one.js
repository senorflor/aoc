const { getLineStream } = require('../../../elvenUtils')

const input = getLineStream('./input.txt')

const nums = new Set()
input.on('line', l => {
  const current = parseInt(l.trim())
  const complement = 2020 - current
  if (nums.has(complement)) {
    const product = complement * current
    console.log(`${complement} * ${current} = ${product}`)
    input.close()
  }
  nums.add(current)
})
