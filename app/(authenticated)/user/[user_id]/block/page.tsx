import { BreadBrumbs } from '@/app/_components/ui/common/bread-crumbs'
import { BlockedGuideCard } from './_components/blocked-guide-card'


export default async function Page() {
  const fetchBlockedGuide = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/blocked_guides/`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Fetching guide index failed:', error);
      return {};
    }
  }

  const bloked_guide = await fetchBlockedGuide()

  console.log(bloked_guide)
  const guide_dummy = [
    {
      id: 1,
      nickname: 'TaroTokyo',
      evaluation: 3.7,
      created_at: '2024-02-22',
      available_languages: ['English', 'Japanese'],
      comment: 'Very knowledgeable and friendly guide!',
      is_favorite: true,
      profile_image: '/prof-dummy.png',
      address: '東京都新宿区',
    },
    {
      id: 2,
      nickname: 'TaroTokyo',
      evaluation: 3.7,
      created_at: '2024-02-22',
      available_languages: ['English', 'Japanese'],
      comment: 'Very knowledgeable and friendly guide!',
      is_favorite: true,
      profile_image: '/prof-dummy.png',
      address: '東京都新宿区',
    },
    {
      id: 3,
      nickname: 'TaroTokyo',
      evaluation: 3.7,
      created_at: '2024-02-22',
      available_languages: ['English', 'Japanese'],
      comment: 'Very knowledgeable and friendly guide!',
      is_favorite: true,
      profile_image: '/prof-dummy.png',
      address: '東京都新宿区',
    },
  ]

  return (
    <>
      <BreadBrumbs text="ブロックリスト" link="/user" />
      <BlockedGuideCard guides={guide_dummy} />
    </>
  )
}
