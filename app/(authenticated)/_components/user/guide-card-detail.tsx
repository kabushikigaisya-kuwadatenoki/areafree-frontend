'use client'
import { formatDate } from '@/app/_functions/format-date'
import { Box, Card, Group, Rating, Text } from '@mantine/core'
import { IconStar } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

type Guide = {
  id: string
  guide_nickname: string
  evaluation: number
  created_at: string
  available_languages: string[]
  comment: string
  profile_image: string
  address: string
  is_favorite?: boolean
}

type Props = {
  guides: Guide | Guide[]
}

export function GuideCardDetail({ guides }: Props) {
  const guidesArray = Array.isArray(guides) ? guides : [guides]
  return (
    <>
      {guidesArray.map((item) => (
        <Card withBorder maw={375} mx="auto" shadow="xs" p="md" mt="xs" radius="md" key={item.id}>
          <Group>
            <Image src={item.profile_image ? item.profile_image : "/prof-dummy.png"} alt={item.guide_nickname} width={87} height={76} />
            <Box w="50%">
              <Text size="10px" mb="xs">
                ガイド評価
              </Text>
              <Rating size="xs" value={item.evaluation} fractions={4} />
              <Group>
                <Text size="md" fw={700} mb="sm">
                  {item.guide_nickname}
                </Text>
                <Link href={`${item.id}/evaluation`}>
                  <IconStar fontWeight={100} width={16} height={16} />
                </Link>
              </Group>
              <Group>
                <Box>
                  <Text size="10px">ガイド歴</Text>
                  <Text size="10px" mt="5px">
                    {formatDate(item.created_at)}
                  </Text>
                </Box>
                <Box>
                  <Text size="10px">対応言語</Text>
                  <Group>
                    {item.available_languages.map((language) => (
                      <Text size="10px" mt="5px" key={language}>
                        {language}
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
          <Text size="xs">{item.comment}</Text>
        </Card>
      ))}
    </>
  )
}
