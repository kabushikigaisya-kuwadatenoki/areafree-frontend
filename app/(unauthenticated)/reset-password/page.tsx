'use client'
import { ComponentWrapper } from '@/app/_components/ui/common/component-wrapper'
import { Button, Group, PasswordInput, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      new_password1: '',
      new_password2: '',
    },
    validate: {
      new_password1: (value = '') =>
        value.length < 8 || !/\d/.test(value) || !/[a-zA-Z]/.test(value)
          ? 'パスワードは8文字以上で、数字と英字を含む必要があります'
          : null,
      new_password2: (value, values) =>
        value !== values.new_password1 ? 'パスワードと確認用パスワードが一致しません' : null,
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true)

    const uid = searchParams.get('uid')
    const token = searchParams.get('token')

    if (!uid || !token) {
      showNotification({
        title: 'エラー',
        message: '無効なリクエストです',
        color: 'red',
        icon: <IconX />,
      })
      setLoading(false)
      return
    }

    try {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/password-reset-confirm/${uid}/${token}/`;
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
          message: 'パスワードが正常に変更されました',
          color: 'green',
          icon: <IconCheck />,
        })
        router.push('/login')
      } else {
        showNotification({
          title: 'エラー',
          message: 'パスワードの変更に失敗しました',
          color: 'red',
          icon: <IconX />,
        })
      }
    } catch (error) {
      console.error('Error:', error)
      showNotification({
        title: 'エラー',
        message: 'パスワードの変更に失敗しました',
        color: 'red',
        icon: <IconX />,
      })
    }

    setLoading(false)
  }

  return (
    <>
      <ComponentWrapper>
        <Text size="md" ta="center" fw={700} mb="sm">
          パスワード再設定
        </Text>
        <Text ta="center" mb="md">
          新しいパスワードを
          <br />
          入力してください。
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <PasswordInput
            label="新しいパスワード"
            required
            {...form.getInputProps('new_password1')}
            mb="md"
          />
          <PasswordInput
            label="新しいパスワード（確認用）"
            required
            {...form.getInputProps('new_password2')}
          />
          <Group justify="center" mt="md">
            <Button type="submit" loading={loading}>
              設定
            </Button>
          </Group>
        </form>
      </ComponentWrapper>
    </>
  )
}