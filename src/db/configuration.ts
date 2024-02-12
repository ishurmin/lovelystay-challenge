import pg_promise from 'pg-promise'

const DB_URL = process.env.DB_URL
if (!DB_URL) {
  throw Error('DB_URL env is missing')
}
const pgp = pg_promise()

export const database = pgp(DB_URL)