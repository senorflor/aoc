const { createReadStream } = require('fs')
const { createInterface } = require('readline')

// Get nums
const input = createInterface({
  input: createReadStream('./input.txt')
})
const nums = []
input.on('line', l => {
  const current = parseInt(l.trim())
  nums.push(current)
})

// Find product of three summing up to 2020
const process = nums => {
  const pairIndex = {}
  for (let i=0; i<nums.length; i++) {
    const num1 = nums[i]
    // Yo dawg:
    for (let j=i+1; j<nums.length; j++) {
      const num2 = nums[j]
      pairIndex[num1+num2] = [num1, num2]
    }
  }
  for (let n of nums) {
    const complement = 2020 - n
    const lookup = pairIndex[complement]
    if (lookup) {
      const [n1, n2] = lookup
      const product = n * n1 * n2
      console.log(`${n} * ${n1} * ${n2} = ${product}`)
      break
    }
  }
}
input.on('close', () => process(nums))
