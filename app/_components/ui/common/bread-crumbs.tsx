import { Group, Paper, Text } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons-react'
import Link from 'next/link'

export function BreadBrumbs({ link, text }: { link: string; text: string }) {
  return (
    <>
      <Paper bg="secondary" component={Link} href={link} p={5} radius="unset">
        <Group>
          <IconChevronLeft color="#33947D" stroke={3} />
          <Text fw={700}>{text}</Text>
        </Group>
      </Paper>
    </>
  )
}
