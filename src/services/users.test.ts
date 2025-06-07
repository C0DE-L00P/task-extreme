import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usersService } from './users'
import { BASE_API_URL } from '../constants'

describe('usersService', () => {

  beforeEach(() => vi.clearAllMocks())

  it('should fetch users successfully', async () => {
    const mockUsers = [{ id: 1, login: 'user1' }, { id: 2, login: 'user2' }]
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockUsers)
    })

    const result = await usersService.getUsers({ perPage: 2, since: 0 })
    
    expect(fetch).toHaveBeenCalledWith(`${BASE_API_URL}/users?per_page=2&since=0`)
    expect(result).toEqual(mockUsers)
  })



  it('should throw error when API rate limit exceeded', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ message: 'API rate limit exceeded' })
    })

    await expect(
      usersService.getUsers({ perPage: 2, since: 0 })
    ).rejects.toThrow('API rate limit exceeded')
  })
}) 