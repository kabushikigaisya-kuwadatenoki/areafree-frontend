"use client"
import { Group, Paper, Rating, Select, Stack, Text } from "@mantine/core"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

type User = {
  id: string
  created_at: string
  nickname: string
  evaluation: number
  comment: string
  profile_image: string | undefined
}

type Props = {
  evaluateUser: User | User[];
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    console.error('Invalid date string:', dateString);
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function EvaluateUserCard({ evaluateUser }: Props) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()
  const [sort, setSort] = useState('')

  const updateFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    sort ? params.set("sort", sort) : params.delete('sort')
    replace(`${pathname}?${params.toString()}`)
  }, [sort, replace, pathname, searchParams])

  useEffect(() => {
    updateFilters()
  }, [updateFilters])

  const usersArray = Array.isArray(evaluateUser) ? evaluateUser : [evaluateUser]
  return (
    <>
      <Select
        maw={328} mx="auto" size="xs"
        label="並べ替え"
        placeholder="投稿が新しい順"
        data={[
          { label: "投稿が新しい順", value: "newest" },
          { label: "投稿が古い順", value: "oldest" },
          { label: "評価が高い順", value: "highest" },
          { label: "評価が低い順", value: "lowest" }
        ]}
        value={sort}
        onChange={(value) => {
          setSort(value || '')
          updateFilters()
        }}
      />
      {usersArray.map((user) => (
        <Paper key={user.id} withBorder p={12} maw={352} mx="auto" mt={10} >
          <Group gap={80}>
            <Stack gap={6}>
              <Text size="10px">投稿日時</Text>
              <Text size="12px">{formatDate(user.created_at)}</Text>
            </Stack>
            <Stack gap={4}>
              <Text size="10px">投稿ユーザー</Text>
              <Group>
                <Image src={user.profile_image ? user.profile_image : "/user_dummy.png"} alt={user.nickname ? user.nickname : ""} width={19} height={19} />
                <Text size="xs">{user.nickname}</Text>
              </Group>
            </Stack>
          </Group>
          <Text size="10px" mt={6}>
            評価
          </Text>
          <Rating size="xs" value={user.evaluation} fractions={4} mt={8} />
          <Text size="10px" mt={6}>
            コメント
          </Text>
          <Text size="xs" mt={8}>
            {user.comment}
          </Text>
        </Paper>
      ))}
    </>
  )

}