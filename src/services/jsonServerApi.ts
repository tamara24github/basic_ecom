const BASE_URL = 'http://localhost:3000'

export const jsonServerApi = async <ApiResponse>(
  path: string,
  init?: RequestInit,
): Promise<ApiResponse> => {
  try {
    const result = await fetch(`${BASE_URL}${path}`, init)
    const data = await result.json()
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}
