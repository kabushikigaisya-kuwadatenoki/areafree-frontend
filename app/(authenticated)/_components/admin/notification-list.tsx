'use client'
import { Button, Paper, Stack, Text } from '@mantine/core'
import Link from 'next/link'

type Notice = {
  id: string
  title: string
  created_at: string
}

type Props = {
  notices: Notice | Notice[]
}
export const NotificationList = ({ notices }: Props) => {
  const NoticeArray = Array.isArray(notices) ? notices : [notices]
  return (
    <>
      <Button
        variant="fill"
        component={Link}
        href="/admin/notice"
        fullWidth
        maw={300}
        mx="auto"
        mt={10}
      >
        一切通知新規作成
      </Button>
      {NoticeArray.map((item) => (
        <>
          <Paper
            p={10}
            withBorder
            radius={15}
            maw={357}
            mx="auto"
            mt={10}
            component={Link}
            href={`/admin/notice/${item.id}`}
          >
            <Stack gap={3}>
              <Text size="10px" c="gray" fw={700}>
                {item.created_at}
              </Text>
              <Text size="xs" fw={700}>
                {item.title}
              </Text>
            </Stack>
          </Paper>
        </>
      ))}
    </>
  )
}
