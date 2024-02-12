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

export const listUsers = async (filter: {location?: string}) => {
  return await database.any<DbUser>(`
    SELECT * FROM users
    WHERE ($1 IS NULL OR location = $1)
  `, [filter?.location])
}