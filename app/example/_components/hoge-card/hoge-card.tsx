import { Card, Progress, Text } from '@mantine/core'
import React from 'react'

type Props = {
  title: string
}

export const HogeCard: React.FC<Props> = ({ title }) => {
  return (
    <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)">
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        {title}
      </Text>
      <Text fz="lg" fw={500}>
        $5.431 / $10.000
      </Text>
      <Progress value={54.31} mt="md" size="lg" radius="xl" />
    </Card>
  )
}
