'use client'
import { Box, Button, Card, Group, Rating, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconStar } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type Guide = {
  id: number
  nickname: string
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

export function BlockedGuideCard({ guides }: Props) {
  const form = useForm({
    initialValues: {
      id: Array.isArray(guides) ? guides[0].id : guides.id,
    },
  })

  const guidesArray = Array.isArray(guides) ? guides : [guides]
  const router = useRouter()
  const [opened, { open, close }] = useDisclosure()

  const MoveEvaluation = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    router.push(`/guide/${id}/evaluation`)
  }

  return (
    <>
      {guidesArray.map((item) => (
        <Card
          withBorder
          maw={352}
          mx="auto"
          shadow="xs"
          p="md"
          mt="xs"
          radius="md"
          style={{ cursor: 'pointer', position: 'relative' }}
        >
          <Button
            style={{ position: 'absolute', right: '16px' }}
            display="inline"
            bg="red"
            onClick={open}
          >
            解除
          </Button>
          <Group>
            <Image src={item.profile_image} alt={item.nickname} width={87} height={76} />
            <Box w="60%">
              <Text size="10px" mb="xs">
                ガイド評価
              </Text>
              <Rating size="xs" value={item.evaluation} fractions={4} />
              <Group>
                <Text size="md" fw={700} mb="sm">
                  {item.nickname}
                </Text>
                <IconStar
                  fontWeight={100}
                  width={16}
                  height={16}
                  onClick={(e) => MoveEvaluation(e, item.id)}
                />
              </Group>
              <Group>
                <Box>
                  <Text size="10px">ガイド歴</Text>
                  <Text size="10px" mt="5px">
                    {item.created_at}
                  </Text>
                </Box>
                <Box>
                  <Text size="10px">対応言語</Text>
                  <Group>
                    {item.available_languages.map((item) => (
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
          <Text size="xs">{item.comment}</Text>
        </Card>
      ))}
    </>
  )
}
