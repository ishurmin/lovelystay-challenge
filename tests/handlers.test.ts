import {jest} from '@jest/globals'
import { GithubUserDetails } from '../src/services/github.js'
import { DbUser } from '../src/db/user.js'

const getUserDetailsMock =
  jest.fn<(username: string) => Promise<GithubUserDetails | null>>()
const createOrUpdateUserMock =
  jest.fn<(user: DbUser) => Promise<void>>()
const listUsersMock =
  jest.fn<() => Promise<DbUser[]>>()

jest.unstable_mockModule('../src/services/github.js',() => ({
  default: {
    getUserDetails: getUserDetailsMock
  }
}))

jest.unstable_mockModule('../src/db/index.js', () => ({
  default: {
    createOrUpdateUser: createOrUpdateUserMock,
    listUsers: listUsersMock
  }
}))

beforeEach(() => {
  getUserDetailsMock.mockReset()
  createOrUpdateUserMock.mockReset()
  listUsersMock.mockReset()
})

const {
  handleAddCommand,
  handleListCommand
} = await import('../src/handlers.js')

describe('adding user', () => {

  test('should add user if GitHub user found', async () => {
    const username = 'some-username'
    const githubUser: GithubUserDetails = {
      name: 'Some Name',
      location: null,
      languages: null
    }

    getUserDetailsMock.mockResolvedValue(githubUser)
    createOrUpdateUserMock.mockResolvedValue()

    await handleAddCommand(username)

    expect(getUserDetailsMock)
      .toHaveBeenCalledWith(username)
    expect(createOrUpdateUserMock)
      .toHaveBeenCalledWith({...githubUser, username: username})
  })

  test('should not add user if GitHub user not found', async () => {
    const username = 'some-username'

    getUserDetailsMock.mockResolvedValue(null)
    createOrUpdateUserMock.mockResolvedValue()

    await handleAddCommand(username)

    expect(getUserDetailsMock)
      .toHaveBeenCalledWith(username)
    expect(createOrUpdateUserMock)
      .toHaveBeenCalledTimes(0)
  })
})

describe('listing users', () => {

  test('should list all users', async () => {

    await handleListCommand({})

    expect(listUsersMock)
      .toHaveBeenCalledWith({})
  })

  test('should list only users with particular location', async () => {
    const location = 'some location'

    await handleListCommand({location: location})

    expect(listUsersMock)
      .toHaveBeenCalledWith({location: location})
  })

  test('should list users with particular location and language', async () => {
    const filter = {
      location: 'some-location',
      language: 'some-language'
    }

    await handleListCommand(filter)

    expect(listUsersMock)
      .toHaveBeenCalledWith(filter)
  })

})
