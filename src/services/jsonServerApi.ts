const BASE_URL = 'http://localhost:3000'

export const jsonServerApi = async <ApiResponse>(
  path: string,
  init?: RequestInit,
  query?: string,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}${path}${query || ''}`, init)
    console.log(response)
    if (!response.ok) {
      let resError
      resError = (await response.json()) as Record<string, never>

      if (!Object.keys(resError).length) {
        resError = {
          status: response.status,
          message: response.statusText,
        }
      }
      return Promise.reject(resError)
      // throw resError
    }
    const data = await response.json()
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}
