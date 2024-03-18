'use client'
import { formatDate } from '@/app/_functions/format-date'
import { Box, Card, Group, Rating, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconStar } from '@tabler/icons-react'
import Cookies from "js-cookie"
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
  favorite_id?: string | null
}

type Props = {
  guides: Guide | Guide[];
  userId: string;
}

export function GuideCard({ guides, userId }: Props) {
  const accessToken = Cookies.get('accessToken');
  const guidesArray = Array.isArray(guides) ? guides : [guides]
  const router = useRouter()

  const MoveEvaluation = (e: React.MouseEvent, userId: string, id: string) => {
    e.stopPropagation()
    router.push(`/user/${userId}/guide/${id}/evaluation`)
  }

  const handleCardClick = (id: string, userId: string) => {
    router.push(`/user/${userId}/guide/${id}`)
  }

  const handleFavorite = async (guide_nickname: string, guideId: string) => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/favorite_guides/`;
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ guide: guideId }),
      };
      const response = await fetch(endpoint, options);
      if (response?.ok) {
        // 成功時の処理
        notifications.show({
          message: `${guide_nickname}をお気に入り登録しました！`,
        });
        router.refresh();
        router.push(`/user/${userId}`);
      } else {
        // エラー時の処理
        const errorResult = await response?.json();
        notifications.show({
          message: errorResult.error,
        });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
  const handleUnFavorite = async (guide_nickname: string, favorite_id: string) => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/favorite_guides/${favorite_id}/`;
      const options = {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store" as RequestCache
      };

      const response = await fetch(endpoint, options);
      if (response?.ok) {
        notifications.show({
          message: `${guide_nickname}をお気に入り解除しました！`,
        });
        router.refresh();
        router.push(`/user/${userId}`);
      } else {
        // エラー時の処理
        const errorResult = await response?.json();
        notifications.show({
          message: errorResult.error,
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  }
  console.log(guides)

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
          key={guide.id ? guide.id : Math.random()}
        >
          <Group>
            <Image src={guide.profile_image ? guide.profile_image : "/prof-dummy.png"} alt={guide.guide_nickname ? guide.guide_nickname : ""} width={87} height={76} />
            <Box w="60%">
              <Text size="10px">
                ガイド評価
              </Text>
              <Rating py={10} pr={5} size="xs" value={guide.evaluation} fractions={4} onClick={(e) => MoveEvaluation(e, userId, guide.id)} />
              <Group justify='space-between'>
                <Text size="md" fw={700} mb="sm">
                  {guide.guide_nickname}
                </Text>
                {guide.favorite_id ? (
                  <IconStar
                    fontWeight={100}
                    width={30}
                    height={30}
                    onClick={(e) => { e.stopPropagation(); guide.favorite_id && handleUnFavorite(guide.guide_nickname, guide.favorite_id) }}
                    fill='#EFF330'
                  />
                ) : (
                  <IconStar
                    fontWeight={100}
                    width={30}
                    height={30}
                    onClick={(e) => { e.stopPropagation(); handleFavorite(guide.guide_nickname, guide.id) }}
                  />
                )}
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
