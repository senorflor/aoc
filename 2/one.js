const { createReadStream } = require('fs')
const { createInterface } = require('readline')

const input = createInterface({
  input: createReadStream('./input.txt')
})

const parse = line => {
  const [range, letter, password] = line.split(/:? /)
  const [lo, hi] = range.split('-')
  return {
    lo,
    hi,
    letter,
    password,
  }
}

const countInstances = (str, letter) => {
  const re = new RegExp(letter, 'g')
  return str
    .match(re)
    ?.length
    ?? 0
}

let validPasswords = 0
input.on('line', line => {
  const { lo, hi, letter, password } = parse(line)
  const count = countInstances(password, letter)
  if (lo <= count && count <= hi) {
    validPasswords++
  }
})

input.on('close', l => {
  console.log(`Valid password count: ${validPasswords}`)
})
