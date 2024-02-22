'use client'
import { Box, Card, Group, Rating, Text } from '@mantine/core'
import { IconStar } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  guide: {
    id: string
    nickname: string
    evaluation: number
    created_at: string
    available_languages: string[]
    comment: string
    favorite: boolean
    profile_image: string
    is_favorite?: boolean
  }
}

export function GuideCard({ guide }: { guide: Props['guide'] }) {
  return (
    <Card
      withBorder
      maw={352}
      mx="auto"
      shadow="xs"
      p="md"
      mt="xs"
      radius="md"
      component={Link}
      href={`guide/${guide.id}`}
    >
      <Group>
        <Image src={guide.profile_image} alt={guide.nickname} width={87} height={76} />
        <Box>
          <Text size="10px" mb="xs">
            ガイド評価
          </Text>
          <Rating size="xs" value={guide.evaluation} fractions={4} />
          <Group>
            <Text size="md" fw={700} mb="sm">
              {guide.nickname}
            </Text>
            <IconStar fontWeight={100} width={16} height={16} />
          </Group>
          <Group>
            <Box>
              <Text size="10px">ガイド歴</Text>
              <Text size="10px" mt="5px">
                {guide.created_at}
              </Text>
            </Box>
            <Box>
              <Text size="10px">対応言語</Text>
              <Group>
                {guide.available_languages.map((item) => (
                  <Text size="10px" mt="5px">
                    {item}
                  </Text>
                ))}
              </Group>
            </Box>
          </Group>
        </Box>
      </Group>
      <Text size="10px" my={10}>
        コメント
      </Text>
      <Text size="xs">{guide.comment}</Text>
    </Card>
  )
}
