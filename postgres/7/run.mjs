import Postgres from '../platter/postgres/node/Aoc2020Day7.js'
import Identity from '@platter/identity-node'


const db = Postgres.identity(new Identity.Key(process.env.PLATTER_API_KEY))


const [{now}] = await db.query('select now()')
console.log(now)
process.exit()

