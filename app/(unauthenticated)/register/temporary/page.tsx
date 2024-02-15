import { Paper, Stack, Text } from '@mantine/core'
export default function Page() {
  return (
    <Paper p="lg" shadow="lg" maw={290} mx="auto" my={34}>
      <Stack align="center">
        <Text fw={700} size="lg">
          会員仮登録完了
        </Text>
        <Text ta="center" size="sm" lh={2}>
          ご入力いただいたメールアドレスへ
          <br />
          登録確認メールをお送りしました。
          <br />
          <br />
          メール本文のURLより
          <br />
          本登録を行ってください。
        </Text>
      </Stack>
    </Paper>
  )
}
