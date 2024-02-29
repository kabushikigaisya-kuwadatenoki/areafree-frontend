import { DetailFilter } from '@/app/(authenticated)/_components/user/detail-filter'
import { GuideCard } from '@/app/(authenticated)/_components/user/guide-card'
import { UserTabs } from '@/app/(authenticated)/_components/user/user-tabs'
import { SearchForm } from '@/app/_components/ui/common/search-form'
import { LoadingOverlay } from '@mantine/core'
import { Paper } from '@mantine/core'
import { Suspense } from 'react'

const guide_dummy = [
  {
    id: "hoge",
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
    id: "huga",
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
    id: "foo",
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

type Props = {
  params: {
    user_id: string
  }
}

const GuideIndexItems = ({ userId }: { userId: string }) => {
  return (
    <>
      <Paper bg="#CDE8E2" p="xs">
        <SearchForm />
        <DetailFilter />
      </Paper>
      <Suspense fallback={<LoadingOverlay />}>
        <GuideCard guides={guide_dummy} userId={userId} />
      </Suspense>
    </>
  )
}
const GuideSearchMap = () => {
  return (
    <>

    </>
  )
}

export default function Page({ params }: Props) {
  const { user_id } = params
  return (
    <>
      <UserTabs
        indexGuideComponents={<GuideIndexItems userId={user_id}
        />}
        searchMapComponents={<GuideSearchMap />}
      />
    </>
  )
}
