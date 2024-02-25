import { AdminGuideCard } from '@/app/(authenticated)/_components/admin/admin-guide-card'
import { AdminTabs } from '@/app/(authenticated)/_components/admin/admin-tabs'
import { SearchReport } from '@/app/_components/ui/common/search-report'

export default function Page() {
  const guide_dummy = [
    {
      id: 1,
      nickname: 'TaroTokyo',
      evaluation: 3.7,
      created_at: '2024-02-22T15:00:00Z',
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
      created_at: '2024-02-22T15:00:00Z',
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
      created_at: '2024-02-22T15:00:00Z',
      available_languages: ['English', 'Japanese'],
      comment: 'Very knowledgeable and friendly guide!',
      is_favorite: true,
      profile_image: '/prof-dummy.png',
      address: '東京都新宿区',
    },
  ]
  return (
    <>
      <SearchReport />
      <AdminGuideCard guides={guide_dummy} />
    </>
  )
}
