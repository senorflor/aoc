const { getRecords } = require('../../elvenUtils')

const lines = getRecords('./input.txt', {
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

const countInstances = (str, letter) => {
  const re = new RegExp(letter, 'g')
  return str
    .match(re)
    ?.length
    ?? 0
}

let validPasswords = 0
for (const { lo, hi, letter, password } of lines) {
  const count = countInstances(password, letter)
  if (lo <= count && count <= hi) {
    validPasswords++
  }
}

console.log(`Valid password count: ${validPasswords}`)
