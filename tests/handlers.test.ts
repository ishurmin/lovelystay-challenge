import {jest} from '@jest/globals'
import { GithubUser } from '../src/services/github.js'
import { DbUser } from '../src/db/user.js'

const getUserMock = jest.fn<(username: string) => Promise<GithubUser | null>>()
const createUserMock = jest.fn<(user: DbUser) => Promise<void>>()
const listUsersMock = jest.fn<() => Promise<DbUser[]>>()

jest.unstable_mockModule('../src/services/github.js',() => ({
  default: {
    getUser: getUserMock
  }
}))

jest.unstable_mockModule('../src/db/index.js', () => ({
  default: {
    createUser: createUserMock,
    listUsers: listUsersMock
  }
}))

beforeEach(() => {
  getUserMock.mockReset()
  createUserMock.mockReset()
  listUsersMock.mockReset()
})

const {
  handleAddCommand,
  handleListCommand
} = await import('../src/handlers.js')

describe('adding user', () => {

  test('should add user if GitHub user found', async () => {
    const username = 'some-username'
    const githubUser: GithubUser = {
      name: 'Some Name',
      location: null
    }

    getUserMock.mockResolvedValue(githubUser)
    createUserMock.mockResolvedValue()

    await handleAddCommand(username)

    expect(getUserMock)
      .toHaveBeenCalledWith(username)
    expect(createUserMock)
      .toHaveBeenCalledWith({...githubUser, username: username})
  })

  test('should not add user if GitHub user not found', async () => {
    const username = 'some-username'

    getUserMock.mockResolvedValue(null)
    createUserMock.mockResolvedValue()

    await handleAddCommand(username)

    expect(getUserMock)
      .toHaveBeenCalledWith(username)
    expect(createUserMock)
      .toHaveBeenCalledTimes(0)
  })
})

describe('listing users', () => {

  test('should list all users', async () => {
    const users: DbUser[] = [
      {
        name: 'Some Name',
        location: null,
        username: 'some-username'
      }
    ]

    listUsersMock.mockResolvedValue(users)

    await handleListCommand()

    expect(listUsersMock)
      .toHaveBeenCalledTimes(1)
  })

})
