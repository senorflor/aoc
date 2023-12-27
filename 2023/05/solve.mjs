import { open } from 'node:fs/promises'
const input = await open('./input.txt')
const fileString = await input.readFile('utf-8')
await input.close()

// ------------------------------------------------------------------ Parse

const [seedList, ...mappingLists] = fileString.split('\n\n')
const [,...startingSeeds] = seedList.split(/\s+/).map(Number)

const listToTransform = list => {
  const [_ ,...entries] = list.split('\n')
  return entries.map(
    (e) => {
      const [dest, start, length] = e.split(' ').map(Number)
      return {
        start,
        end: start + length,
        offset: dest - start
      }
    }
  ).sort((t1, t2) => t1.start - t2.start)
}

const transformSequence = mappingLists.map(listToTransform)

// ------------------------------------------------------------------ Part 1

const lookup = (start, transform) => {
  const applicableRange = transform
    .find(t => t.end > start && t.start <= start) || { offset: 0 }
  return start + applicableRange.offset
}

const seedToLoc = seed => {
  return transformSequence.reduce(
    (curr, transform) => {
      return lookup(curr, transform)
    },
    seed
  )
}

const startingSeedsWithLocations = startingSeeds.map(
  (seed, i) => ({
    i,
    seed,
    location: seedToLoc(seed)
  })
).sort((l1, l2) => l1.location - l2.location)

// ------------------------------------------------------------------ Part 2

// Brute force it with a generator for now...

function* expand(startList) {
  const [nextSeed, count, ...rest] = startList
  for (let i = nextSeed; i < nextSeed + count; i++) {
    yield i
  }
  if (startList.length) yield* expand(rest)
}

const seedGenerator = expand(startingSeeds)
let lowestLocation = Number.MAX_SAFE_INTEGER

while (true) {
  const seed = seedGenerator.next()
  if (seed.done) {
    break
  }
  const newLoc = seedToLoc(seed.value)
  lowestLocation = Math.min(newLoc, lowestLocation)
}

// ------------------------------------------------------------------ Solve!

console.log({
  part1: startingSeedsWithLocations[0].location,
  part2: lowestLocation
})