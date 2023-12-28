import { open } from 'node:fs/promises'
const input = await open('./input.txt')
const fileString = await input.readFile('utf-8')
await input.close()

// ------------------------------------------------------------------ Parse

// Transform card encoding so we can use lexicographical sort
const sortableSuitMapping = {
  'T': 'B',
  'J': 'C',
  'Q': 'D',
  'K': 'E',
  'A': 'F'
}

const hands = fileString.split('\n').map(line => {
  let [cards, bidStr] = line.split(' ')
  for (const [before, after] of Object.entries(sortableSuitMapping)) {
    cards = cards.replaceAll(before, after)
  }
  return {
    cards,
    bid: Number(bidStr)
  }
})

// ------------------------------------------------------------------ Part 1

const t = {
  HIGH_CARD: 0,
  PAIR: 1,
  TWO_PAIR: 2,
  TRIPLE: 3,
  FULL_HOUSE: 4,
  QUADRUPLE: 5,
  QUINTUPLE: 6
}

const typeHand = hand => {
  const cardMap = new Map()
  for (const c of hand.cards.split('')) {
    cardMap.set(c, cardMap.has(c) ? cardMap.get(c) + 1 : 1)
  }
  const counts = [...cardMap.values()]
  let type = t.HIGH_CARD
  if (counts.includes(5)) {
    type = t.QUINTUPLE
  } else if (counts.includes(4)) {
    type = t.QUADRUPLE
  } else if (counts.includes(3) && counts.includes(2)) {
    type = t.FULL_HOUSE
  } else if (counts.includes(3)) {
    type = t.TRIPLE
  } else if (counts.filter(c => c == 2).length == 2) {
    type = t.TWO_PAIR
  } else if (counts.includes(2)) {
    type = t.PAIR
  }
  return {
    type,
    ...hand
  }
}

const valueHands = (hands, typeFn = typeHand) => hands
  .map(typeFn)
  .sort(
    (l, r) => (l.type - r.type) || (l.cards < r.cards ? -1 : 1)
  )
  .reduce(
    (sum, hand, rank) => sum + hand.bid * (rank + 1),
    0
  )

const part1 = valueHands(hands)

// ------------------------------------------------------------------ Part 2

// Transform 'C' to '0' so we can still use lexicographical sort for part 2
const jokerHands = hands.map(
  h => ({ ...h, cards: h.cards.replaceAll('C', '0')})
)

const typeHandWithJokers = hand => {
  const cardMap = new Map()
  let jokerCount = 0
  for (const c of hand.cards.split('')) {
    if (c === '0') {
      jokerCount++
    } else {
      cardMap.set(c, cardMap.has(c) ? cardMap.get(c) + 1 : 1)
    }
  }
  const counts = [...cardMap.values()]
  const largestPossibleGroup = jokerCount + Math.max(...counts, 0)
  let handType = 0
  if (largestPossibleGroup === 5) {
    handType = 6
  } else if (largestPossibleGroup === 4) {
    handType = 5
  } else if (largestPossibleGroup === 3 && counts.length == 2) {
    handType = 4
  } else if (largestPossibleGroup === 3) {
    handType = 3
  } else if (
    (counts.filter(c => c == 2).length == 2) ||
    (counts.filter(c => c == 2).length == 1 && jokerCount)
  ) {
    handType = 2
  } else if (counts.includes(2) || jokerCount) {
    handType = 1
  }
  return {
    type: handType,
    ...hand
  }
}

const part2 = valueHands(jokerHands, typeHandWithJokers)

// ------------------------------------------------------------------ Solve!

console.log({
  part1,
  part2
})