const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_JSON_API_URL_PROD
  : import.meta.env.VITE_JSON_API_URL_DEV

export const jsonServerApi = async <ApiResponse>(
  path: string,
  init?: RequestInit,
  query: string = '',
): Promise<ApiResponse> => {
  try {
    const result = await fetch(`${BASE_URL}${path}${query}`, init)
    const data = await result.json()
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}
