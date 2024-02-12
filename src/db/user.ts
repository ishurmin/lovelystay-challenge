import { database } from './configuration.js'

export type DbUser = {
  username: string;
  name: string | null;
  location: string | null;
  languages: string[] | null;
}

export type UserFilter = {
  location?: string;
  language?: string;
}

export const createOrUpdateUser = async (user: DbUser) => {
  await database.none(`
    INSERT INTO users(\${this:name}) 
    VALUES(\${this:list})
    ON CONFLICT (username) DO UPDATE SET
    name = EXCLUDED.name,
    location = EXCLUDED.location,
    languages = EXCLUDED.languages;
  `, user)
}

export const listUsers = async (filter: UserFilter) => {
  return await database.any<DbUser>(`
    SELECT * FROM users
    WHERE ($1 IS NULL OR location = $1)
    AND ($2 IS NULL OR $2 = ANY(languages))
  `, [filter.location, filter.language])
}