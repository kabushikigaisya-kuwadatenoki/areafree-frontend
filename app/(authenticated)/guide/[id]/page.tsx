import { GuideCard } from '@/app/(authenticated)/_components/guide/guide-card'
import KebabReport from '@/app/(authenticated)/_components/guide/kebab-report'
import { Button, Stack } from '@mantine/core'

export default function Page({ params }: { params: { id: number } }) {
  const guide_dummy = {
    id: 1,
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
      <Stack justify="center" align="center" gap={0} mt="md">
        <Button variant="filled" display="block" w="100%" maw="320px">
          このガイドを評価する
        </Button>
        <GuideCard guides={guide_dummy} />
        <KebabReport nickname={guide_dummy.nickname} id={params.id} />
      </Stack>
    </>
  )
}
