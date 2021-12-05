import Postgres from '../platter/postgres/node/Aoc2020Day5.js'
import Identity from '@platter/identity-node'

const key = new Identity.Key(process.env.PLATTER_API_KEY)
const db = Postgres.identity(key)

const now = await db.query(`
  select now();
`)
console.log(now)
process.exit()