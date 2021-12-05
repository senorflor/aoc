import Postgres from '../platter/postgres/node/Aoc2020Day1.js'
import Identity from '@platter/identity-node'

import Utils from '../../js/elvenUtils/index.js'

const key = new Identity.Key(process.env.PLATTER_API_KEY)
const db = Postgres.identity(key)

// Prepare data
await db.query(`
  CREATE TABLE IF NOT EXISTS expenses (
    amount int
  );
`)
const expenses = Utils.getRecords('./input.txt', {})
const insertQuery = `INSERT INTO expenses VALUES
  (${expenses.join("), (")})
`
await db.query(`
  DO $$
  DECLARE
    expense_count INT := (select count(*) from expenses);
  BEGIN
    IF expense_count = 0 THEN
      ${insertQuery};
    END IF;
  END $$ LANGUAGE plpgsql;
`)

// Problem 1
const [{amount: first}, {amount: second}] = await db.query(`
  select amount from expenses
  INTERSECT
  select 2020-amount as complement from expenses
  ;
`)
console.log(first * second)

// Problem 2
const [{one, two, three}] = await db.query(`
  SELECT 
    a.amount AS one,
    b.amount AS two,
    2020 - a.amount - b.amount AS three
  FROM
    expenses AS a, expenses as b
  WHERE
    2020 - a.amount - b.amount IN (select amount from expenses)
  ;
`)
console.log(one * two * three)