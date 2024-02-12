import { database } from './configuration.js'

export type DbUser = {
  username: string;
  name: string | null;
  location: string | null;
}

export const createUser = async (user: DbUser) => {
  await database.none(`
    INSERT INTO users(\${this:name}) 
    VALUES(\${this:list})
    ON CONFLICT DO NOTHING
  `, user)
}

export const listUsers = async () => {
  return await database.any<DbUser>(`
    SELECT * FROM users
  `)
}