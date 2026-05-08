import { NextResponse } from 'next/server'

type VkApiResponse = {
  response?: {
    items: Array<{
      id: number
      owner_id: number
      text: string
      date: number
      is_pinned?: number
    }>
  }
  error?: {
    error_msg: string
  }
}

export async function GET() {
  const token = process.env.VK_SERVICE_TOKEN
  const domain = process.env.VK_GROUP_DOMAIN || 'koorcentr_narfu'

  if (!token) {
    return NextResponse.json(
      { items: [], error: 'VK_SERVICE_TOKEN is missing' },
      { status: 500 },
    )
  }

  const url = new URL('https://api.vk.com/method/wall.get')
  url.searchParams.set('domain', domain)
  url.searchParams.set('count', '6')
  url.searchParams.set('filter', 'owner')
  url.searchParams.set('v', '5.199')
  url.searchParams.set('access_token', token)

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 600 },
    })

    if (!response.ok) {
      return NextResponse.json(
        { items: [], error: 'Failed to fetch VK news' },
        { status: 502 },
      )
    }

    const data = (await response.json()) as VkApiResponse

    if (data.error) {
      return NextResponse.json(
        { items: [], error: data.error.error_msg },
        { status: 502 },
      )
    }

    const items = (data.response?.items ?? [])
      .filter((item) => !item.is_pinned)
      .map((item) => ({
        id: item.id,
        text: item.text ?? '',
        date: item.date,
        url: `https://vk.com/wall${item.owner_id}_${item.id}`,
      }))

    return NextResponse.json({ items })
  } catch {
    return NextResponse.json(
      { items: [], error: 'Unexpected VK fetch error' },
      { status: 500 },
    )
  }
}
