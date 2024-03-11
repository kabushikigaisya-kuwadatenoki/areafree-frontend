'use client'
import { formatDate } from '@/app/_functions/format-date'
import { Box, Button, Card, Group, Rating, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconStar } from '@tabler/icons-react'
import Cookies from "js-cookie"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

type Guide = {
  id: string
  user: string
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

  console.log(form.values)

  const guidesArray = Array.isArray(guides) ? guides : [guides]
  const router = useRouter()

  const MoveEvaluation = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    router.push(`/guide/${id}/evaluation`)
  }

  async function handleDelete(id: string, user: string, nickname: string) {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/blocked_guides/${id}/`
    const accessToken = Cookies.get("accessToken")
    try {
      const response: Response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        cache: "no-cache" as RequestCache,
      })

      if (response?.ok) {
        notifications.show({
          message: `${nickname}のブロックを解除しました`,
        });
        close()
      }
    } catch (error: any) {
      console.error(error.message);
      throw new Error(error.message);
    }
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
          key={item.id}
        >
          <Button style={{ position: 'absolute', right: '16px' }} display="inline" bg="red" onClick={() => { handleDelete(item.id, item.user, item.nickname) }}>
            解除
          </Button>
          <Group>
            <Image src={item.profile_image ? item.profile_image : "/prof-dummy.png"} alt={item.nickname} width={87} height={76} />
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
              <Group mt={5}>
                <Box>
                  <Text size="10px">ガイド歴</Text>
                  <Text size="10px" mt="5px">
                    {formatDate(item.created_at)}
                  </Text>
                </Box>
                <Box>
                  <Text size="10px">対応言語</Text>
                  <Group>
                    {item.available_languages.map((item) => (
                      <Text size="10px" mt="5px" key={item}>
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
