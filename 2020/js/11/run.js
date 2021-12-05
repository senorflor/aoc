const { getRecords } = require('../elvenUtils')

const seats = getRecords('./input.txt', {
  parserFn: row => row
    .trim()
    .split("")
    .map(c => {
      switch(c) {
        case 'L':
          return false
          break
        case '#':
          return true
          break
        case '.':
          return null
          break
      }
    })
})



const [width, height] = [seats[0].length, seats.length]
console.log([width, height])