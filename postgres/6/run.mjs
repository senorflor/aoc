import Postgres from '../platter/postgres/node/Aoc2020Day6.js'
import Identity from '@platter/identity-node'

const key = new Identity.Key(process.env.PLATTER_API_KEY)
const db = Postgres.identity(key)

const time = await db.query(`
  select now();
`)
console.log(time)
process.exit()
