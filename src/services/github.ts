const BASE_URL = 'https://api.github.com'

export type GithubUser = {
  name: string | null
  location: string | null
}

const getUser = async (username: string) => {
  const res = await fetch(`${BASE_URL}/users/${username}`)
  if (res.ok) {
    const json = await res.json()
    return {
      name: json.name,
      location: json.location
    } as GithubUser
  } else if (res.status === 404) {
    return null
  } else {
    throw Error(`Unexpected request status ${res.status}`)
  }
}

export default {getUser}