import { DetailFilter } from '@/app/(authenticated)/_components/guide/detail-filter'
import { GuideCard } from '@/app/(authenticated)/_components/guide/guide-card'
import { UserTabs } from '@/app/(authenticated)/_components/guide/user-tabs'
import { SearchForm } from '@/app/_components/ui/common/search-form'
import { LoadingOverlay } from '@mantine/core'
import { Paper } from '@mantine/core'
import { Suspense } from 'react'

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

const GuideIndexItems = () => {
  return (
    <>
      <Paper bg="#CDE8E2" p="xs">
        <SearchForm />
        <DetailFilter />
      </Paper>
      <Suspense fallback={<LoadingOverlay />}>
        <GuideCard guides={guide_dummy} />
      </Suspense>
    </>
  )
}
const GuideSearchMap = () => {
  return (
    <>
      <Paper bg="#CDE8E2" p="xs">
        <SearchForm />
        <DetailFilter />
      </Paper>
      <Suspense fallback={<LoadingOverlay />}>
        <GuideCard guides={guide_dummy} />
      </Suspense>
    </>
  )
}

export default function Page() {
  return (
    <>
      <UserTabs
        indexGuideComponents={<GuideIndexItems />}
        searchMapComponents={<GuideSearchMap />}
      />
    </>
  )
}
