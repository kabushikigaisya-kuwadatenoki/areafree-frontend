'use client'
import { formatDate } from '@/app/_functions/format-date'
import { Box, Card, Group, Rating, Text } from '@mantine/core'
import { IconStar } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

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
  guides: Guide | Guide[];
  userId: string;
}

export function GuideCard({ guides, userId }: Props) {
  const guidesArray = Array.isArray(guides) ? guides : [guides]
  const router = useRouter()

  const MoveEvaluation = (e: React.MouseEvent, userId: string, id: string) => {
    e.stopPropagation()
    router.push(`/user/${userId}/guide/${id}/evaluation`)
  }

  const handleCardClick = (id: string, userId: string) => {
    router.push(`/user/${userId}/guide/${id}`)
  }

  return (
    <>
      {guidesArray.map((guide) => (
        <Card
          withBorder
          maw={352}
          mx="auto"
          shadow="xs"
          p="md"
          mt="xs"
          radius="md"
          onClick={() => handleCardClick(guide.id, userId)}
          style={{ cursor: 'pointer' }}
          key={guide.id}
        >
          <Group>
            <Image src={guide.profile_image ? guide.profile_image : "/prof-dummy.png"} alt={guide.guide_nickname} width={87} height={76} />
            <Box w="60%">
              <Text size="10px" mb="xs">
                ガイド評価
              </Text>
              <Rating size="xs" value={guide.evaluation} fractions={4} />
              <Group>
                <Text size="md" fw={700} mb="sm">
                  {guide.guide_nickname}
                </Text>
                <IconStar
                  fontWeight={100}
                  width={16}
                  height={16}
                  onClick={(e) => MoveEvaluation(e, userId, guide.id)}
                />
              </Group>
              <Group>
                <Box>
                  <Text size="10px">ガイド歴</Text>
                  <Text size="10px" mt="5px">
                    {formatDate(guide.created_at)}
                  </Text>
                </Box>
                <Box>
                  <Text size="10px">対応言語</Text>
                  <Group>
                    {guide.available_languages?.map((language) => (
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
          <Text size="xs">{guide.comment}</Text>
        </Card>
      ))}
    </>
  )
}
