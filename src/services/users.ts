import { BASE_API_URL } from '../constants'

export interface FetchUsersParams {
  perPage: number
  since: number
}

export const usersService = {
  getUsers: async ({ perPage, since }: FetchUsersParams) => {
    const res = await fetch(`${BASE_API_URL}/users?per_page=${perPage}&since=${since}`)
    const data = await res.json()
    if(data.message?.includes('API rate limit exceeded')) 
      throw new Error(data.message)
    return data
  }
} 