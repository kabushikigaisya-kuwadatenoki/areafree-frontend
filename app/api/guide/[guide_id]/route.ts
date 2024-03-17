import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { guide_id: string } }) {
  const { guide_id } = params
  const accessToken = request.headers.get('Authorization')?.replace('Bearer ', '')

  try {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/guides/${guide_id}/`

    const res = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error fetching guide data:', error.message)
    return NextResponse.json({ error: 'Failed to fetch guide data' }, { status: 500 })
  }
}
