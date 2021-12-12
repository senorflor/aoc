const input = require('fs').readFileSync(
  __dirname + '/input.txt',
  'utf8'
).trim().split('\n')

const called = input[0].trim().split(',').map(Number)
const boardCount = Math.floor(input.length / 5)
const boards = Array(boardCount)
for (let i = 0; i < boardCount; i++) {
  boards[i] = input
    .slice(i * 6 + 2, i * 6 + 7)
    .map(r => r.trim().split(/\s+/).map(Number))
}

// Part 1
const boardPos = (board) => {
  const boardMap = new Map()
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      boardMap.set(board[i][j], i * 10 + j)
    }
  }
  return boardMap
}

const wins = [
  [00, 01, 02, 03, 04],
  [10, 11, 12, 13, 14],
  [20, 21, 22, 23, 24],
  [30, 31, 32, 33, 34],
  [40, 41, 42, 43, 44],
  [00, 10, 20, 30, 40],
  [01, 11, 21, 31, 41],
  [02, 12, 22, 32, 42],
  [03, 13, 23, 33, 43],
  [04, 14, 24, 34, 44],
]
const checkPosSet = (posSet) => {
  const conclusion = wins.some(
    w => w.every(
      p => {
        return posSet.has(p)
      }
    )
  )
  return conclusion
}

const predictWin = (
  board,
  nums
) => {
  const boardNums = boardPos(board)
  const markedNums = new Set()
  const posSet = new Set()
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    const pos = boardNums.get(num)
    if (pos !== undefined) {
      markedNums.add(num)
      posSet.add(pos)
      if (checkPosSet(posSet)) {
        return [
          i,
          num,
          [...boardNums.keys()].filter(
            n => !markedNums.has(n)
          ).reduce(
            (a, b) => a + b
          )
        ]
      }
    }
  }
  return ('No win')
}

const winningBoards = boards.map(
  b => predictWin(b, called)
).filter(
  r => r !== 'No win'
).sort(
  ([a,], [b,]) => a - b
)

console.log(
  winningBoards.at(0).slice(1, 3).reduce((a, b) => a * b)
)

// Part 2
console.log(
  winningBoards.at(-1).slice(1, 3).reduce((a, b) => a * b)
)
