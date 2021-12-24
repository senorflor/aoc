const input = require('./input.js')
  .split('\n')
  .map(
    l => l.split(' ')
  )
  .map(
    ([dir, n]) => [dir, +n]
  )

// Helper
const driveSub = (course, instructions, start) => {
  return course.reduce(instructions, start)
}

// Part 1
const driver1 = ([h, d], [dir, diff]) => {
  switch (dir) {
    case 'forward':
      return [h + diff, d]
    case 'up':
      return [h, d - diff]
    case 'down':
      return [h, d + diff]
  }
}

// Use const + block scope so that we can reuse meaningful const h and d
// identifiers in part two without top-level variables/reassignment.
{
  const [h, d] = driveSub(input, driver1, [0, 0])
  console.log(h * d)
}

// Part 2
const driver2 = ([h, d, aim], [dir, diff]) => {
  switch (dir) {
    case 'forward':
      return [h + diff, d + aim * diff, aim]
    case 'up':
      return [h, d, aim - diff]
    case 'down':
      return [h, d, aim + diff]
  }
}

{
  const [h, d] = driveSub(input, driver2, [0, 0, 0])
  console.log(h * d)
}
