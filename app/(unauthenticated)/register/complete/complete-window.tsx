import { Button, Paper, Stack, Text } from '@mantine/core'
import Link from 'next/link'

export function CompleteWindow({ userId }: { userId: string }) {
  return (
    <Paper p="lg" shadow="lg" maw={290} mx="auto" my={34}>
      <Stack align="center">
        <Text fw={700} size="lg">
          会員仮登録完了
        </Text>
        <Text ta="center" size="xs" lh={2}>
          会員登録が完了しました。
          <br />
          ユーザーID：{userId}
          <br />
          <br />
          ガイド登録で誰でも実際にガイドとして
          <br />
          活動することができます。
          <br />
          登録をご希望の場合は下記より
          <br />
          ご登録ください。
        </Text>
        <Button size="md" component={Link} href="/guide/register">
          ガイド登録
        </Button>
        <Text size="xs" c="blue" component={Link} href="/login">
          ログインはこちら
        </Text>
      </Stack>
    </Paper>
  )
}
