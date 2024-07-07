const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_JSON_API_URL_PROD
  : import.meta.env.VITE_JSON_API_URL_DEV

export const jsonServerApi = async <ApiResponse>(
  path: string,
  init?: RequestInit,
  query: string = '',
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}${path}${query}`, init)
    const data = await response.json()
    const lastPage = getLastPageFromResponse(response)
    return lastPage ? { lastPage, data } : data
  } catch (error) {
    return Promise.reject(error)
  }
}

const getLastPageFromResponse = (response: Response) => {
  const linkHeader = response.headers.get('Link')
  if (linkHeader === '') return 1
  if (!linkHeader) return
  const lastLinkHeader = linkHeader.split(',').find((s) => s.includes('last'))
  if (!lastLinkHeader) return
  const lastLinkHeaderUrl = lastLinkHeader.split(';')[0]
  const lastLinkHeaderUrlParams = new URLSearchParams(lastLinkHeaderUrl)
  const lastPage = lastLinkHeaderUrlParams.get('_page')
  if (!lastPage) return
  return Number(lastPage)
}
