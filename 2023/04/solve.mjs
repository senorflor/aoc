import { open } from 'node:fs/promises'
const input = await open('./input.txt')
const fileString = await input.readFile('utf-8')
const cards = fileString.split('\n')

// ------------------------------------------------------------------ Part 1

const CARD_EXTRACTOR = new RegExp(
  'Card\\s+\\d+:\\s+' + 
  '([^|]+)' +            // Winners
  '\\s+\\|\\s+' + 
  '(.+)'                 // Card #s
)

const intersection = (arr1, arr2) => {
  const set1 = new Set(arr1)
  return arr2.filter(e => set1.has(e))
}

const winningNumbers = card => {
  // Parse
  const [, winList, cardList] = card.match(CARD_EXTRACTOR)
  const winners = winList.split(/\s+/)
  const cardNums = cardList.split(/\s+/)
 
  // Evaluate
  return intersection(winners, cardNums)
}

const winningNumberArr = cards.map(winningNumbers)
const totalPoints = winningNumberArr.reduce(
  (sum, winners) => sum + (winners.length ? 2 ** (winners.length - 1) : 0),
  0
)

// ------------------------------------------------------------------ Part 2

let cardCounts = new Array(cards.length).fill(1)
winningNumberArr.forEach(
  (winners, currentCard) => {
    const winnerCount = winners.length
    const nextCard = currentCard + 1
    for (let i = nextCard; i < nextCard + winnerCount; i++) {
      cardCounts[i] = cardCounts[i] + cardCounts[currentCard]
    }
  }
)
const totalCards = cardCounts.reduce((sum, next) => sum + next, 0)

// ------------------------------------------------------------------ Solve!

console.log(totalPoints, totalCards)