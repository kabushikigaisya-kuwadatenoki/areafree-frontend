import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const accessToken = request.headers.get('Authorization')?.replace('Bearer ', '')

    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/user-plan/`

    const res = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error fetching plans data:', error.message)
    return NextResponse.json({ error: 'Failed to fetch plans data' }, { status: 500 })
  }
}
