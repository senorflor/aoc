const { getRecords } = require('../elvenUtils')

const ops = getRecords('./input.txt', {
  parserFn: op => op.split(' ')
})

const exec = (
  curr=0,
  trace=new Set(),
  branched=false,
  acc=0,
  prog=ops
) => {
  // Start with success in mind inspirational poster dot gif
  if (curr === ops.length) {
    console.log(acc)
    return
  }

  // ... or fail fast.
  if (trace.has(curr) || curr < 0 || curr > ops.length) {
    return
  }

  // Otherwise, compute.
  const [op, n] = prog[curr]
  const arg = parseInt(n)
  trace.add(curr)
  switch(op) {
  case 'nop': 
    exec(curr + 1, trace, branched, acc, prog)
    if (!branched) {
      exec(curr + arg, new Set([...trace]), !branched, acc, prog)
    }
    break;
  case 'acc':
    exec(curr + 1, trace, branched, acc + arg, prog)
    break;
  case 'jmp':
    exec(curr + arg, trace, branched, acc, prog)
    if (!branched) {
      exec(curr + 1, new Set([...trace]), !branched, acc, prog)
    }
    break;
  }
}

exec()
