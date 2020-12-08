const { getRecords } = require('../elvenUtils')

const records = getRecords('./input.txt', {
  delimiter: '\n',
  parserFn: r => {
    const [parent, childString] = r.split('s contain ')
    if (childString === 'no other bags.') {
      return [parent, []]
    }
    const children = childString
      .replace('.', '')
      .replaceAll('bags', 'bag')
      .split(', ')
      .map(b => [
        // Fragile parse, but all bag counts are 1 digit only:
        parseInt(b.substring(0, 2)),
        b.substring(2)
      ])
    return [parent, children]
  }
})

// Construct tree ("contains") and inverted tree ("contained by") from rules
const tree = {}
const invertedTree = {}
records.forEach(([parent, children]) => {
  children.forEach(([count, child]) => {
    if (tree[parent]) {
      tree[parent][child] = count
    } else {
      tree[parent] = {
        [child]: count
      }
    }
    if (invertedTree[child]) {
      invertedTree[child][parent] = count
    } else {
      invertedTree[child] = {
        [parent]: count
      }
    }
  })
})

// Search up contained by tree for containing colors
const colorCheck = (bag, colors) => {
  const containers = invertedTree[bag]
  if (containers) {
    Object.keys(containers)
      .forEach(b => {
        colors.add(b)
        colorCheck(b, colors)
      })
  }
}

// Search down contains tree for required bag count
const contentsCheck = (bag) => {
  let count = 1 // self
  const children = tree[bag]
  if (children) {
    count += Object.entries(children)
      .map(([b, c]) => c * contentsCheck(b))
      .reduce((n1, n2) => n1 + n2, 0)
  }
  return count
}

// Haha, these calling conventions/implementations both suck:

// Part one, including janky accumulator Set
const colors = new Set()
colorCheck('shiny gold bag', colors)
console.log(colors.size)

// Part two; don't forget to not count shiny gold bag itself!
console.log(contentsCheck('shiny gold bag') - 1)
