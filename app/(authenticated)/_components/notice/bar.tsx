import { Badge, Group, Paper, Stack, Text } from '@mantine/core'
import Link from 'next/link'
type Props = {
  notice: {
    id: number
    date: string
    time: string
    title: string
    badge: boolean
  }[]
}

export function Bar({ notice }: Props) {
  return (
    <>
      {notice.map((item) => (
        <Paper
          key={item.id}
          withBorder
          radius="md"
          py={6}
          px={12}
          maw="352px"
          mx="auto"
          my={8}
          component={Link}
          href={`notice/${item.id}`}
        >
          <Group justify="space-between">
            <Stack gap={4}>
              <Group gap={4}>
                <Text size="10px" c="grey">
                  {item.date}
                </Text>
                <Text size="10px" c="grey">
                  {item.time}
                </Text>
              </Group>
              <Text size="md" fw={700} c="#555555">
                {item.title}
              </Text>
            </Stack>
            {item.badge && (
              <Badge variant="danger" radius={0} style={{ background: 'red' }}>
                新着
              </Badge>
            )}
          </Group>
        </Paper>
      ))}
    </>
  )
}
