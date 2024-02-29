import { BreadBrumbs } from '@/app/_components/ui/common/bread-crumbs'
import { Paper, Stack, Text } from '@mantine/core'

export default function Page({ params }: { params: { id: number } }) {
  const content = {
    id: 1,
    title: '新着のお知らせ',
    date: '2022-01-01',
    time: '12:00',
    badge: true,
    content: 'hogehogehugahugafoofoobarbar',
  }
  return (
    <>
      <Text>{params.id}</Text>
      <BreadBrumbs text="通知詳細" link="/notice" />
      <Paper withBorder w="95%" mx="auto" p="md" mt={10}>
        <Stack gap={5} mb={10}>
          <Text size="xs">タイトル</Text>
          <Text size="xs">{content.title}</Text>
        </Stack>
        <Stack gap={5} mb={10}>
          <Text size="xs">通知日時</Text>
          <Text size="xs">{content.date}</Text>
        </Stack>
        <Stack gap={5}>
          <Text size="xs">本文</Text>
          <Text size="xs">{content.content}</Text>
        </Stack>
      </Paper>
    </>
  )
}
