import { open } from 'node:fs/promises'

const input = await open('./input.txt')


// ------------------------------------------------------------------ Part 1

const isDigit = char => !isNaN(char)

const getDigits = str => str.split('').filter(isDigit)

const numberellipsis = arrOfDigits => {
  const first = arrOfDigits[0]
  const last = arrOfDigits.at(-1)
  return Number(first + last)
}

const getCalibrationValue = str => numberellipsis(getDigits(str))


// ------------------------------------------------------------------ Part 2

// Spelled numbers can overlap, e.g. threeight and eighthree, so if we do
// the naive thing and just replace in-place, we might remove the start of
// the last spelled number. Instead, to ensure correctness, we replace the
// first spelled digit, append a copy with the last spelled digit replaced,
// then run part 1's correction function over the expanded calibration line.
// Jank, but works 😆

const corrections = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
}

const reverse = str => str.split('').reverse().join('')

const reverseCorrections = Object.fromEntries(
  Object.entries(corrections).map(([k, v]) => [reverse(k), v])
)

const forwardMatcher = new RegExp(
  `(${Object.keys(corrections).join('|')})`
)
const backwardMatcher = new RegExp(
  `(${Object.keys(corrections).map(s => reverse(s)).join('|')})`
)

const expandCorrectly = str => {
  const firstMatch = str.match(forwardMatcher)?.[0]
  const halfCorrected = firstMatch
    ? str.replace(firstMatch, corrections[firstMatch])
    : str

  const reversed = reverse(str)
  const lastMatch = reversed.match(backwardMatcher)?.[0]
  const reverseCorrected = reverse(lastMatch
    ? reversed.replace(lastMatch, reverseCorrections[lastMatch])
    : reversed
  )

  return halfCorrected + reverseCorrected
}

// ------------------------------------------------------------------ Solve!

let sum1 = 0
let sum2 = 0

for await (const line of input.readLines()) {
  sum1 += getCalibrationValue(line)
  sum2 += getCalibrationValue(expandCorrectly(line))
}

console.log(sum1, sum2)