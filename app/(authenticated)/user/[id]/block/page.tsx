import { BlockedGuideCard } from './_components/blocked-guide-card'

export default function Page({ params }: { params: { id: number } }) {
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

  return <BlockedGuideCard guides={guide_dummy} />
}
