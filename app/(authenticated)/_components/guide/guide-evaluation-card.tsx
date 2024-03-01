import { Group, Paper, Rating, Stack, Text } from "@mantine/core"
import Image from "next/image"

type GuideEvaluate = {
  nickname: string,
  created_at: string,
  profile_image: string,
  evaluation: number
  comment: string
}

type Props = {
  guideEvaluate: GuideEvaluate | GuideEvaluate[]
  evaluation: number
}

export function GuideEvaluationCard({ guideEvaluate, evaluation }: Props) {
  const EvaluateArray = Array.isArray(guideEvaluate) ? guideEvaluate : [guideEvaluate]

  return (
    <>
      <Group maw={352} mx="auto" mt={10}>
        <Text size="xs">総合評価</Text>
        <Rating fractions={4} size="md" value={evaluation} />
      </Group>
      {EvaluateArray.map((item) => (
        <Paper key={item.nickname} withBorder maw={352} mx="auto" mt={10} p={15}>
          <Group gap={100}>
            <Stack gap={5}>
              <Text size="xs">投稿日時</Text>
              <Text size="xs">{item.created_at}</Text>
            </Stack>
            <Stack gap={5}>
              <Text size="xs">投稿者</Text>
              <Group>
                <Image src={item.profile_image} alt="ユーザー画像" width={19} height={19} />
                <Text size="xs">{item.nickname}</Text>
              </Group>
            </Stack>
          </Group>
          <Stack mt={10} gap={5}>
            <Text size="xs">評価</Text>
            <Rating size="md" value={item.evaluation} />
          </Stack>
          <Text mt={5} size="xs">コメント</Text>
          <Text size="xs">
            {item.comment || "コメントがありません"}
          </Text>
        </Paper>
      ))}
    </>
  )
}