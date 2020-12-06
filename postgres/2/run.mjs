import Postgres from '../platter/postgres/node/Aoc2020Day2.js'
import Identity from '@platter/identity-node'

import Utils from '../../js/elvenUtils/index.js'

const key = new Identity.Key(process.env.PLATTER_API_KEY)
const db = Postgres.identity(key)

// Prepare data
await db.query(`
  CREATE TABLE IF NOT EXISTS passwords (
    lo INT,
    hi INT,
    letter TEXT,
    password TEXT
  );
`)
await db.query(`
  delete from passwords;
`)
const passwordRecords = Utils.getRecords('./input.txt', {
  parserFn: r => {
    const [policy, password] = r.split(": ")
    const [range, letter] = policy.split(" ")
    const [lo, hi] = range.split('-')
    return {
      lo,
      hi,
      letter,
      password
    }
  }
})
const insertQuery = `INSERT INTO passwords VALUES
  (${passwordRecords
    .map(e => `${e.lo}, ${e.hi}, '${e.letter}', '${e.password}'`)
    .join("), (")
  })
`
await db.query(`
  DO $$
  DECLARE
    password_count INT := (select count(*) from passwords);
  BEGIN
    IF password_count = 0 THEN
      ${insertQuery};
    END IF;
  END $$ LANGUAGE plpgsql;
`)

// Problem 1
const [{count: answer1}] = await db.query(`
  SELECT
    COUNT(*)
  FROM
    (
      SELECT
        lo,
        hi,
        LENGTH(password) - LENGTH(REPLACE(password, letter, '')) AS letter_count
      FROM
        passwords
    ) AS pwds
  WHERE
    pwds.lo <= pwds.letter_count
    AND
    pwds.letter_count <= pwds.hi
`)
console.log(answer1)

// Problem 2
const [{count: answer2}] = await db.query(`
  SELECT
    COUNT(*)
  FROM
    (
      SELECT
        letter,
        SUBSTRING(password from lo for 1) AS lo_char,
        SUBSTRING(password from hi for 1) AS hi_char
      FROM
        passwords
    ) AS pwds
  WHERE
    pwds.lo_char = letter AND pwds.hi_char <> letter
    OR
    pwds.lo_char <> letter AND pwds.hi_char = letter
`)
console.log(answer2)
process.exit()