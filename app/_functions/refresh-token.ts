import Cookies from 'js-cookie'

// リフレッシュトークンを使用して新しいアクセストークンを取得
async function refreshAccessToken(refreshToken: string): Promise<string> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  })

  if (!response.ok) {
    throw new Error('Token refresh failed')
  }

  const data = await response.json()
  Cookies.set('accessToken', data.access, { expires: 1 })
  return data.access
}

// APIリクエストを実行する関数をラップ
export async function apiRequestWithRefresh(endpoint: string, options: RequestInit) {
  try {
    const accessToken = Cookies.get('accessToken')
    let response = await fetch(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (response.status === 401) {
      const refreshToken = Cookies.get('refreshToken')
      if (typeof refreshToken === 'undefined') {
        throw new Error('Refresh token is undefined')
      }
      const newAccessToken = await refreshAccessToken(refreshToken)
      response = await fetch(endpoint, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      })
    }

    return response
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}
