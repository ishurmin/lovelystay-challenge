import db from './db/index.js'
import github from './services/github.js'
import { UserFilter } from './db/user.js'

export const handleAddCommand = async (username: string) => {
  const user = await github.getUserDetails(username)
  if (user) {
    console.log('GitHub user:', user)
    await db.createOrUpdateUser({...user, username: username})
  }
}

export const handleListCommand = async (options: UserFilter) => {
  const users = await db.listUsers(options)
  console.table(users)
}