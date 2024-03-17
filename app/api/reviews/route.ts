import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const guide_id = searchParams.get('guide_id') || ''
  const sort = searchParams.get('sort') || ''
  const accessToken = request.headers.get('Authorization')?.replace('Bearer ', '')

  try {
    const queryParam = sort ? `&sort=${sort}` : ''
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/reviews/?guide_id=${guide_id}${queryParam}`

    const res = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!res.ok) {
      throw new Error(`An error occurred: ${res.statusText}`)
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error fetching reviews data:', error.message)
    return NextResponse.json({ error: 'Failed to fetch reviews data' }, { status: 500 })
  }
}
