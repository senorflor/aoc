const { getLineArray } = require('../../elvenUtils')

const lines = getLineArray('./input.txt', {
  parserFn: line => {
    const [range, letter, password] = line.split(/:? /)
    const [lo, hi] = range.split('-')
    return {
      lo,
      hi,
      letter,
      password,
    }
  }
})

let validPasswords = 0
for (const { lo, hi, letter, password } of lines) {
  const first = password[lo-1] === letter
  const second = password[hi-1] === letter
  if (first != second) {
    validPasswords++
  }
}

console.log(`Valid password count: ${validPasswords}`)