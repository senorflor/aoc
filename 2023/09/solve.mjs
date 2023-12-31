import { open } from 'node:fs/promises'
const input = await open('./input.txt')

// ------------------------------------------------------------------ Parse

const seqs = []
for await (const line of input.readLines()) {
  seqs.push(
    line.split(/\s+/).map(Number)
  )
}

// ------------------------------------------------------------------ Part 1

// Went way down the rabbit hole on this one to learn some discrete math
// that we didn't get to in my undergrad class!

// The process illustrated in the problem description is recursive over the
// previous "column" of the repeated difference triangle. Intuitively, this
// made it seem there should be a closed form over the first column. There
// is indeed, and it is derivable from the recurrence representing the
// previous column calculation method.

// While this closed form recalculates a bunch of additions already implied
// in the later columns of the difference triangle, it was still very fun
// and instructive to see how to derive it. This method separates out the
// invariant calculations for any sequence of degree N (Pascal's triangle),
// implemented briefly here via the choose(n, k) function, from the varying
// elements, determined by the particular sequence.

const differ = seq => seq.reduce(
  (reduced, curr, i, arr) => {
    if (i !== 0) {
      reduced.push(curr - arr[i-1])
    }
    return reduced
  },
  []
)

const notAllSame = seq => seq.some(e => e !== seq[0])

const differenceTable = seq => {
  const dt = [seq]
  while (notAllSame(dt.at(-1))) {
    dt.push(differ(dt.at(-1)))
  }
  return dt
}

// Would memoize or do a lookup table if we were doing a bunch of these
const choose = (n, k) => {
  if (k < 0) return 0
  if (k === 0) return 1
  return (n * choose(n-1, k-1)) / k
}

const getNth = (seq, n) => {
  const dt = differenceTable(seq)
  return dt.reduce((sum, seq, i) => sum + choose(n, i) * seq[0], 0)
}

const sumOfNextVals = seqs
  .map(s => getNth(s, s.length))
  .reduce((s, e) => s + e, 0)

// ------------------------------------------------------------------ Part 2

const sumOfPrevVals = seqs
  .map(s => getNth(s, -1))
  .reduce((s, e) => s + e, 0)

// ------------------------------------------------------------------ Solve!

console.log({
  part1: sumOfNextVals,
  part2: sumOfPrevVals
})