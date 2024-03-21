'use client'
import { ComponentWrapper } from '@/app/_components/ui/common/component-wrapper'
import { Button, Group, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'メールアドレスの形式が無効です'),
    },
  })

  const handleSubmit = async (values: { email: string }) => {
    setLoading(true)
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/password-reset/`;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        showNotification({
          title: '成功',
          message: 'パスワードリセットメールが送信されました',
          color: 'green',
          icon: <IconCheck />,
        })
        router.push('/forgot-password/complete')
      } else {
        showNotification({
          title: 'エラー',
          message: 'パスワードリセットメールの送信に失敗しました',
          color: 'red',
          icon: <IconX />,
        })
      }
    } catch (error) {
      console.error('Error:', error)
      showNotification({
        title: 'エラー',
        message: 'パスワードリセットメールの送信に失敗しました',
        color: 'red',
        icon: <IconX />,
      })
    }

    setLoading(false)
  }

  return (
    <>
      <ComponentWrapper>
        <Text size="md" fw={700} ta="center" pb="1rem">
          パスワード再設定
        </Text>
        <Text size="xs" ta={'center'} maw="256px" mx="auto" lh={1.5} mb="1em">
          ご登録いただいたメールアドレスを
          <br />
          入力してください。
          <br />
          <br />
          メールアドレス宛にパスワードの再設定のご案内メールを送信します
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput label="メールアドレス" size="sm" {...form.getInputProps('email')} />
          <Group justify="center" mt={'1em'}>
            <Button type="submit" loading={loading}>
              送信
            </Button>
          </Group>
        </form>
      </ComponentWrapper>
    </>
  )
}