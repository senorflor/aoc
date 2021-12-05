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

const parseYear = str => str.match(/\d{4}/) ? parseInt(str, 10) : -1
const parseHeight = str => {
  // I have been naughty, not nice.
  const [, n, unit] = str.match(/^(\d+)(in|cm)$/) || [null, -1, 'in']
  return [n, unit]
}

valid = passports.filter(
  p => required.every(k => p[k])
).filter(
  ({
    byr,
    iyr,
    eyr,
    hgt,
    hcl,
    ecl,
    pid,
  }) => {
    const by = parseYear(byr)
    const iy = parseYear(iyr)
    const ey = parseYear(eyr)
    const [n, unit] = parseHeight(hgt)
    // UGH
    return  (1920 <= by) && (by <= 2002) &&
      (2010 <= iy) && (iy <= 2020) &&
      (2020 <= ey) && (ey <= 2030) &&
      (((unit == 'in') && (59 <= n) && (n <= 76)) ||
       ((unit == 'cm') && (150 <= n) && (n <= 193))) &&
      (hcl.match(/^#[0-9a-f]{6}$/)) &&
      (["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(ecl)) &&
      (pid.match(/^[0-9]{9}$/))
  }
)

console.log(valid.length)