const BASE_URL = 'https://api.github.com'

export type GithubUserDetails = {
  name: string | null;
  location: string | null;
  languages: string[] | null;
}

type UserData = {
  repos_url: string;
  name: string | null;
  location: string | null;
}

type RepoData = {
  languages_url: string;
}[]

type LanguagesData = Record<string, number>

async function fetchJson<T>(url: string): Promise<T | null> {
  const res = await fetch(url)
  if (res.ok) {
    return (await res.json()) as T
  } else {
    return null
  }
}

const getUserDetails = async (username: string) => {
  const res = await fetch(`${BASE_URL}/users/${username}`)
  if (res.ok) {

    const userData = (await res.json()) as UserData
    const repoData = (await fetchJson<RepoData>(userData.repos_url)) || []
    const languagesData = (await Promise.all(
      repoData.map(r => fetchJson<LanguagesData>(r.languages_url))
    )).reduce((a,b) => ({...a, ...b})) || {}
    const languages = Object.keys(languagesData)

    return {
      name: userData.name,
      location: userData.location,
      languages: languages
    } as GithubUserDetails

  } else if (res.status === 404) {
    return null
  } else {
    throw Error(`Unexpected request status ${res.status}`)
  }
}

export default {getUserDetails}