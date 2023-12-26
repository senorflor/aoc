import { open } from 'node:fs/promises'

const input = await open('./input.txt')


// ------------------------------------------------------------------ Part 1

const maxPerColor = {
  red: 12,
  green: 13,
  blue: 14
}

const splitTrim = (str, sep) => str.split(sep).map(part => part.trim())

const parseGame = line => {
  const [label, game] = splitTrim(line, ':')
  const number = Number(splitTrim(label, ' ')[1])

  const rounds = splitTrim(game, ';').map(r => splitTrim(r, ','))
  const samples = rounds.map(
    r => r.reduce(
      (soFar, component) => {
        const [n, color] = splitTrim(component, ' ')
        soFar[color] = Number(n)
        return soFar
      },
      {}
    )
  )
  return { number, samples }
}

const isLegalGame = ({ samples }, maxes=maxPerColor) => {
  const colors = Object.keys(maxes)
  return samples.every(
    sample => colors.every(
      color => !sample[color] || sample[color] <= maxes[color]
    )
  )
}

// ------------------------------------------------------------------ Part 2

const product = arr => arr.reduce((l, r) => l * r, 1)

const requiredPower = ({ samples }, maxes=maxPerColor) => {
  const powerIdentity = Object.keys(maxes).reduce(
    (pi, c) => {
      pi[c] = 1
      return pi
    },
    {}
  )
  const powerObject = samples.reduce(
    (po, sample) => {
      Object.entries(sample).forEach(
        ([color, n]) => {
          if (n && n > po[color]) {
            po[color] = n
          }
        }
      )
      return po
    },
    powerIdentity
  )
  return product(
    Object.values(powerObject)
  )
}

// ------------------------------------------------------------------ Solve!

let sum1 = 0
let sum2 = 0

for await (const line of input.readLines()) {
  const game = parseGame(line)
  if (isLegalGame(game)) {
    sum1 += game.number
  }
  sum2 += requiredPower(game)
}

console.log(sum1, sum2)