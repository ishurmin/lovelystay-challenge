import db from './db/index.js'
import github from './services/github.js'

export const handleAddCommand = async (username: string) => {
  const user = await github.getUser(username)
  if (user) {
    console.log('GitHub user:', user)
    await db.createUser({...user, username: username})
  }
}

export const handleListCommand = async (options: {location?: string}) => {
  const users = await db.listUsers(options)
  console.table(users)
}