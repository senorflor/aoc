const {
  Worker, isMainThread, workerData, parentPort
} = require('worker_threads')
const { getRecords } = require('../../elvenUtils')

// Let's gratuitously over-engineer a solution to part 1 with worker threads, to learn a bit about the
// Worker Thread API. Also throwing in some Emoji opcodes for fun :)

// First, split out the "commutative" operations (movements in a cardinal direction, irrespective of
// ship steering)
const commutative = {
  'E': '👉',
  'N': '👆',
  'W': '👈',
  'S': '👇',
}

// ...and the "non-commutative" operations: the stream of direction changes and directional sailing
const noncommutative = {
  'L': '⤴️',
  'R': '⤵️',
  'F': '🚢'
}

// Santa's little helpers
const manhattan = (x, y) => Math.abs(x) + Math.abs(y)
const mod360 = (d) => ((d % 360) + 360) % 360

// Time to get non-linear: the worker_threads builtin library exposes a simple boolean in case you
// want to thread your worker code in the same file like it's the early 2000s. Totally doing that.
if (isMainThread) {
  (async() => {  // I may be using threads, but I still want my async/await.

    // Read the file and translate letter opcodes to emoji ones.
    const directions = getRecords('./input.txt', {
      parserFn: d => {
        const [, op, n] = d.match(/([ENWSLRF])(\d+)/)
        return [
          commutative[op] || noncommutative[op],
          parseInt(n)
        ]
      }
    })

    // Create the data object to pass to worker threads
    const emptyOpMap = Object.values(commutative)
      .reduce(
        (m, key) => ({...m, [key]: []}),
        {}
      )
    // ...adding a new key for the combined non-commutative op stream (⤴️, ⤵️, and 🚢)
    emptyOpMap['🛳️'] = []
    
    // Fill worker data object with operations from the input file
    const sortedOps = directions.reduce(
      (m, [dir, n]) => {
        if(m[dir]) {
          m[dir].push(n)
        } else {
          m['🛳️'].push([dir, n])
        }
        return m
      },
      emptyOpMap
    )

    // Process commutative and non-commutative operations in parallel
    const [[x1, y1], [x2, y2]] = await Promise.all([
      new Promise((res, rej) => {
        const worker = new Worker(__filename, {
          // Commutative operations (cardinal movement) in this thread.
          workerData: ['🔀', sortedOps]
        })
          .on('message', res)
          .on('error', rej)
          .on('exit', code => {
            if (code !== 0) rej(new Error(`Worker failed: code ${code}`))
          })
      }),
      new Promise((res, rej) => {
        const worker = new Worker(__filename, {
          // Ordered operations 
          workerData: ['🔢', sortedOps['🛳️']]
        })
          .on('message', res)
          .on('error', rej)
          .on('exit', code => {
            if (code !== 0) rej(new Error(`Worker failed: code ${code}`))
          })
      })
    ])

    // Merge the two threaded results
    console.log(
      manhattan(x1 + x2, y1 + y2)
    )
  })()
} else {
  // Code for the worker thread dispatch based on types. Meta opcodes, basically 😆
  const [type, sortedOps] = workerData
  if (type === '🔀') {
    // Commutative ops
    console.log(type)
    const netCardinalMovement = Object.fromEntries(
      Object.values(commutative).map(
        dir => [dir, sortedOps[dir].reduce(
          (n1, n2) => n1 + n2,
          0
        )]
      )
    )
    parentPort.postMessage([
      netCardinalMovement['👉'] - netCardinalMovement['👈'],
      netCardinalMovement['👆'] - netCardinalMovement['👇'],
    ])
  }
  if (type === '🔢') {
    // Non-commutative ops
    console.log(type)
    const [x, y] = sortedOps.reduce(
      ([x, y, dir], [op, n]) => {
        switch(op) {
          case '⤴️':
            dir = mod360(dir + n)
            break
          case '⤵️':
            dir = mod360(dir - n)
            break
          case '🚢':
            switch(dir) {
              case 0:
                x += n
                break
              case 90:
                y += n
                break
              case 180:
                x -= n
                break
              case 270:
                y -= n
                break
            }
            break
        }
        return [x, y, dir]
      }, [0, 0, 0]
    )
    parentPort.postMessage([x, y])
  } else {
    throw new Error('Unrecognized worker type')
  }
}
