

import { EvaluationModal } from '@/app/(authenticated)/_components/user/evaluation-modal'
import { GuideCardDetail } from '@/app/(authenticated)/_components/user/guide-card-detail'
import { KebabReport } from '@/app/(authenticated)/_components/user/kebab-report'
import { Stack } from '@mantine/core'

export default function Page({ params }: { params: { id: number } }) {

  const guide_dummy = {
    id: "1",
    nickname: 'ニックネーム太郎',
    evaluation: 3.7,
    created_at: '2024-02-22T15:00:00Z',
    available_languages: ['English', 'Japanese'],
    comment: 'Very knowledgeable and friendly guide!',
    is_favorite: true,
    profile_image: '/prof-dummy.png',
    address: '東京都新宿区',
  }

  return (
    <>
      <EvaluationModal nickname={guide_dummy.nickname} id={guide_dummy.id} />
      <Stack justify="center" align="center" gap={0} mt="sm">
        <GuideCardDetail guides={guide_dummy} />
        <KebabReport nickname={guide_dummy.nickname} id={params.id} />
      </Stack>
    </>
  )
}
