import Postgres from '../platter/postgres/node/Aoc2020Day3.js'
import Identity from '@platter/identity-node'

const key = new Identity.Key(process.env.PLATTER_API_KEY)
const db = Postgres.identity(key)

const time = await db.query('Select now();')
console.log(time)

process.exit()