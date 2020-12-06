const { getRecords } = require('../elvenUtils')

const passports = getRecords('./input.txt', {
  delimiter: '\n\n',
  parserFn: p => Object.fromEntries(
    p.trim()
      .split(/[ \n]/)
      .map(r => r.split(':'))
  )
})

const required = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid'
]

valid = passports.filter(
  p => required.every(k => p[k])
)

console.log(valid.length)