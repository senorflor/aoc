// ------------------------------------------------------------------ Parse

const races = [
  { time: 42, distance: 308 },
  { time: 89, distance: 1170 },
  { time: 91, distance: 1291 },
  { time: 89, distance: 1467 },
]

const bigRace = {
  time: 42899189,
  distance: 308117012911467
}

// ------------------------------------------------------------------ Part 1

const product = arr => arr.reduce((acc, e) => acc * e, 1)

const countWins = ({time, distance}) => {
  let wins = 0
  for (let hold = 0; hold < time; hold++) {
    const travel = hold * (time - hold)
    wins += (travel > distance) // Sorry, type-lovers 🤣
  }
  return wins
}

const winProduct = product(races.map(countWins))

// ------------------------------------------------------------------ Part 2

const bigWins = countWins(bigRace)

// ------------------------------------------------------------------ Solve!

console.log({
  part1: winProduct,
  part2: bigWins
})
