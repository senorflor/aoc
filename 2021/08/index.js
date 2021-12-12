const input = require('fs').readFileSync(
  __dirname + '/input.txt',
  'utf8'
).trim().split('\n').map(l =>
  l.split('|')
)

// Part 1
console.log(
  input.map(l => l[1].trim().split(' '))
    .flat()
    .filter(n => [2, 3, 4, 7].includes(n.length))
    .length
)

// Part 2
const input2 = require('fs').readFileSync(
  __dirname + '/input.txt',
  'utf8'
).trim().split('\n').map(l => l.split('|'))

const solve = (line) => {
  const [patterns, output] = line
  const charOccurences = patterns.join('').split('').reduce((freqs, ch) => {
    if (freqs[ch]) freqs[ch]++
    else freqs[ch] = 1
    return freqs
  }, {})
  /*
    To distinguish from the letter coding for segments, we number as follows below:
     0000 
    1    2
    1    2
     3333 
    4    5
    4    5
     6666
  */
  const oneSegments = patterns.filter(digitCode => digitCode.length === 2)[0].split('')
  const includesOne = (digitCode) => oneSegments.every(s => digitCode.includes(s))
  const seg4 = [...Object.entries(charOccurences)]
    .filter(([, n]) => n === 4)[0][0]
  const seg5 = [...Object.entries(charOccurences)]
    .filter(([, n]) => n === 9)[0][0]
  const answer = output.map(digitCode => {
    const len = digitCode.length
    if (!digitCode.includes(seg5)) return 2
    if (len === 2) return 1
    if (len === 3) return 7
    if (len === 4) return 4
    if (len === 7) return 8
    if (len === 6) {
      if (!digitCode.includes(seg4)) return 9
      if (includesOne(digitCode)) return 0
      return 6
    }
    if (includesOne(digitCode)) return 3
    return 5
  }).join('')
  return (Number(answer))
}

console.log(
  input
    .map(sides => sides.map(s => s.trim().split(' ')))
    .map(solve)
    .reduce((a, b) => a + b)
)
