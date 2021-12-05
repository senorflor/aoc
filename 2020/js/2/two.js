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

let validPasswords = 0
input.on('line', line => {
  const { lo, hi, letter, password } = parse(line)
  const first = password[lo-1] === letter
  const second = password[hi-1] === letter

  if (first != second) {
    validPasswords++
  }
})

input.on('close', l => {
  console.log(`Valid password count: ${validPasswords}`)
})