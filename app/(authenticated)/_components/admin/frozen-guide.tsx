'use client'
import { formatDate } from '@/app/_functions/format-date'
import { Box, Button, Card, Group, Rating, Stack, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

type FrozenGuide = {
  id: string;
  evaluation: number;
  first_name: string;
  last_name: string;
  guide_id: string;
  created_at: string;
  reported_count: number;
  reported_by_count: number;
  comment: string;
  profile_image: string;
};

type Props = {
  guides: FrozenGuide | FrozenGuide[]
}

export function FrozenGuide({ guides }: Props) {
  const guidesArray = Array.isArray(guides) ? guides : [guides]
  const router = useRouter()

  const MoveEvaluation = (e: React.MouseEvent, guide_id: string) => {
    e.stopPropagation()
    router.push(`/user/admin/guide/${guide_id}`)
  }
  const handleUnfreeze = async (reportId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/reports/${reportId}/unfreeze/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        notifications.show({
          title: '凍結解除',
          message: 'ガイドの凍結を解除しました',
          color: 'green',
        });
        router.refresh();  // ページをリフレッシュして最新のデータを取得
      }
    } catch (error) {
      console.error('Error unfreezing guide:', error);
      notifications.show({
        title: 'エラー',
        message: '凍結解除に失敗しました',
        color: 'red',
      });
    }
  };

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
              <Button variant="fill" bg="red" style={{ position: 'absolute', top: 10, right: 10 }}
                onClick={() => handleUnfreeze(item.id)}
              >
                解除
              </Button>
              <Image
                src={item.profile_image ? item.profile_image : '/prof-dummy.png'}
                alt={`${item.last_name} ${item.first_name}`}
                width={82}
                height={71}
              />
              <Box w="60%">
                <Text size="10px" mb="xs">
                  ガイド評価
                </Text>
                <Rating
                  onClick={(e) => item.evaluation && MoveEvaluation(e, item.guide_id)}
                  size="xs" value={item.evaluation} fractions={4} />
                <Group>
                  <Text size="md" fw={700} mb="sm">
                    {item.last_name}
                    {item.first_name}
                  </Text>
                </Group>
                <Stack>
                  <Box>
                    <Text size="10px">ガイド歴</Text>
                    <Text size="10px" mt="5px">
                      {formatDate(item.created_at)}
                    </Text>
                  </Box>
                  <Group>
                    <Stack gap={5}>
                      <Text size="10px" c="blue">
                        通報した回数
                      </Text>
                      <Text size="10px">{item.reported_by_count}回</Text>
                    </Stack>
                    <Stack gap={5}>
                      <Text size="10px" c="blue">
                        通報された回数
                      </Text>
                      <Text size="10px">{item.reported_count}回</Text>
                    </Stack>
                  </Group>
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
