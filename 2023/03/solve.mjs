import { open } from 'node:fs/promises'
const input = await open('./input.txt')


// ------------------------------------------------------------------ Part 1

const numbersPerLine = []
const schematic = []

for await (const line of input.readLines()) {
  numbersPerLine.push([...line.matchAll(/\d+/g)])
  schematic.push(line)
}

const SYMBOLS = '@*$&/=-+#%'
const isSymbol = (c, symbols = SYMBOLS) => symbols.includes(c)
const hasSymbol = str => str.split('').some(c => isSymbol(c))

const isNearSymbol = (match, lineNum, s = schematic) => {
  const { '0': matchStr, index: matchStart } = match
  const currentLine = s[lineNum]
  const matchLength = matchStr.length
  const matchEnd = matchStart + matchLength

  const notAtTop = lineNum > 0
  const notAtLeft = matchStart > 0
  const notAtRight = matchEnd < currentLine.length
  const notAtBottom = lineNum < s.length - 1
  // Check above
  const prevLine = s?.[lineNum - 1]
  if (notAtTop) {
    const upperText = prevLine.substring(matchStart, matchEnd)
    if (hasSymbol(upperText)) {
      return true
    }
  }
  // Check above left
  if (notAtTop && notAtLeft) {
    const prevUpChar = prevLine[matchStart - 1]
    if (hasSymbol(prevUpChar)) {
      return true
    }
  }
  // Check above right
  if (notAtTop && notAtRight) {
    const nextUpChar = prevLine[matchEnd]
    if (hasSymbol(nextUpChar)) {
      return true
    }
  }
  // Check left
  if (notAtLeft) {
    const prevChar = currentLine[matchStart - 1]
    if (isSymbol(prevChar)) {
      return true
    }
  }
  // Check right
  if (notAtRight) {
    const nextChar = currentLine[matchEnd]
    if (isSymbol(nextChar)) {
      return true
    }
  }
  // Check below
  const nextLine = s?.[lineNum + 1]
  if (notAtBottom) {
    const underText = nextLine.substring(matchStart, matchEnd)
    if (hasSymbol(underText)) {
      return true
    }
  }
  // Check below left
  if (notAtBottom && notAtLeft) {
    const prevDownChar = nextLine[matchStart - 1]
    if (hasSymbol(prevDownChar)) {
      return true
    }
  }
  // Check below right
  if (notAtBottom && notAtRight) {
    const nextDownChar = nextLine[matchEnd]
    if (hasSymbol(nextDownChar)) {
      return true
    }
  }

  return false
}

let sum1 = 0

numbersPerLine.forEach(
  (lineMatches, i) => lineMatches.forEach(
    match => {
        sum1 += isNearSymbol(match, i) ? Number(match[0]) : 0
    }
  )
)

// ------------------------------------------------------------------ Part 2


// ------------------------------------------------------------------ Solve!


let sum2 = 0

console.log(sum1, sum2)