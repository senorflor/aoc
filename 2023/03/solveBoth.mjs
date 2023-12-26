import { open } from 'node:fs/promises'
const input = await open('./input.txt')


// ------------------------------------------------------------------ Part 1

// Array.fromAsync() is proposed, but for now, we must be verbose.
// https://github.com/tc39/proposal-array-from-async
const schematic = []
for await (const line of input.readLines()) {
  schematic.push(line)
}

const matchInterval = match => [match.index, match.index + match[0].length]

const intervalsIntersect = ([firstStart, firstEnd], [secondStart, secondEnd]) => {
  return !(firstStart >= secondEnd || secondStart >= firstEnd)
}

// Find each "hub" match and 0+ distinct adjacent "spoke" matches
const findAdjacentMatches = (hubPattern, spokePattern, minMatches = 1, lines = schematic) => {
  // Construct match "matrices" by line
  const hubMatchLines = []
  const spokeCandidateMatchLines = []
  for (const line of lines) {
    hubMatchLines.push([...line.matchAll(hubPattern)])
    spokeCandidateMatchLines.push([...line.matchAll(spokePattern)])
  }

  // Associate any adcacent "spoke" matches with their hubs
  const matchesWithSpokes = []
  hubMatchLines.forEach(
    (hubMatchLine, lineNum) => {
      const prevSpokeCandidateLine = spokeCandidateMatchLines[lineNum-1] || []
      const currentSpokeCandidateLine = spokeCandidateMatchLines[lineNum]
      const nextSpokeCandidateLine = spokeCandidateMatchLines[lineNum+1] || []
      for (const hubMatch of hubMatchLine) {
        // find, uniq, and associate matching spoke matches
        const { '0': hubStr, index: hubStart } = hubMatch
        const hubEnd = hubStart + hubStr.length

        const otherLinesInterval = [hubStart - 1, hubEnd + 1]
        const leftInterval = [hubStart - 1, hubStart]
        const rightInterval = [hubEnd, hubEnd + 1]
        
        const spokeMatches = [
          ...(prevSpokeCandidateLine.filter(
            sc => intervalsIntersect(matchInterval(sc), otherLinesInterval)
          )),
          ...(currentSpokeCandidateLine.filter(
            sc => intervalsIntersect(matchInterval(sc), leftInterval) ||
              intervalsIntersect(matchInterval(sc), rightInterval)
          )),
          ...(nextSpokeCandidateLine.filter(
            sc => intervalsIntersect(matchInterval(sc), otherLinesInterval)
          )),
        ]

        if (spokeMatches.length >= minMatches) {
          matchesWithSpokes.push({
            hubMatch,
            spokeMatches
          })
        }
      }
    }
  )
  return matchesWithSpokes
}

const NUMBER_MATCHER = /\d+/g
const SYMBOL_MATCHER = /[@\*\$\&\/=\-\+#%]/g

const numsWithAdjacentSymbols =
  findAdjacentMatches(NUMBER_MATCHER, SYMBOL_MATCHER)

const part1 = numsWithAdjacentSymbols
  .reduce((sum, { hubMatch: { '0': numStr } }) => sum + Number(numStr), 0)


// ------------------------------------------------------------------ Part 2

const GEAR_MATCHER = /\*/g

const gearsWithTwoAdjacentNumbers =
  findAdjacentMatches(GEAR_MATCHER, NUMBER_MATCHER)
    .filter(({ spokeMatches }) => spokeMatches.length == 2)

const part2 = gearsWithTwoAdjacentNumbers
  .map(m => m.spokeMatches)
  .map(([{ '0': numStr1},  {'0': numStr2}]) => numStr1 * numStr2)
  .reduce((sum, n) => sum + n, 0)

// ------------------------------------------------------------------ Solve!

console.log(part1, part2)