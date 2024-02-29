'use client'
import { Box, Button, Card, Group, Rating, Stack, Text } from '@mantine/core'
import { IconStar } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

type FrozenGuideType = {
  id: string
  first_name: string
  last_name: string
  evaluation: number
  created_at: string
  comment: string
  profile_image: string
}

type Props = {
  guides: FrozenGuideType | FrozenGuideType[]
}

export function FrozenGuide({ guides }: Props) {
  const guidesArray = Array.isArray(guides) ? guides : [guides]
  const router = useRouter()
  const MoveEvaluation = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    router.push(`/guide/${id}/evaluation`)
  }

  return (
    <>
      {guidesArray.map((item) => (
        <>
          <Card
            withBorder
            maw={352}
            mx="auto"
            shadow="xs"
            p="md"
            mt="xs"
            radius="md"
            style={{
              position: 'relative',
              cursor: 'pointer',
            }}
            key={item.id}
          >
            <Group align="start" justify="space-between">
              <Button variant="fill" bg="red" style={{ position: 'absolute', top: 10, right: 10 }}>
                解除
              </Button>
              <Image
                src={item.profile_image}
                alt={`${item.last_name} ${item.first_name}`}
                width={82}
                height={71}
              />
              <Box w="60%">
                <Text size="10px" mb="xs">
                  ガイド評価
                </Text>
                <Rating size="xs" value={item.evaluation} fractions={4} />
                <Group>
                  <Text size="md" fw={700} mb="sm">
                    {item.last_name}
                    {item.first_name}
                  </Text>
                  <IconStar
                    fontWeight={100}
                    width={16}
                    height={16}
                    onClick={(e) => MoveEvaluation(e, item.id)}
                  />
                </Group>
                <Stack>
                  <Box>
                    <Text size="10px">ガイド歴</Text>
                    <Text size="10px" mt="5px">
                      {item.created_at}
                    </Text>
                  </Box>
                </Stack>
              </Box>
            </Group>
            <Text size="10px" my={10}>
              コメント
            </Text>
            <Text size="xs" lts={0.5}>
              {item.comment}
            </Text>
          </Card>
        </>
      ))}
    </>
  )
}