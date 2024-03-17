"use client"
import { Button, Paper, Stack, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useRouter, useSearchParams } from 'next/navigation'

export function CompleteWindow() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const uid = params.get("uid")
  const token = params.get("token")

  const confirmUser = async (uid: string, token: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/register/complete/${uid}/${token}/`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await fetch(endpoint, options)
      if (response.ok) {
        // 認証が成功した場合の処理
        notifications.show({
          title: '成功',
          message: 'アカウントが認証されました。ログインページへ移動します。',
        });
        router.push("/login")
      } else {
        // エラー処理
        notifications.show({
          title: '認証エラー',
          message: '認証に失敗しました。リンクが有効か確認してください。',
        });
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
      notifications.show({
        title: 'エラー',
        message: '通信中にエラーが発生しました。',
      });
    }
  }
  return (
    <Paper p="lg" shadow="lg" maw={290} mx="auto" my={34}>
      <Stack align="center">
        <Text fw={700} size="lg">
          アカウント認証
        </Text>
        <Text ta="center" size="xs" lh={2}>
          メールアドレス認証を行いますか？
        </Text>
        <Button size="md"
          onClick={() => uid && token && confirmUser(uid, token)}
        >
          認証する
        </Button>
      </Stack>
    </Paper>
  )
}
