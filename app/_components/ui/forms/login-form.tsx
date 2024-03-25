'use client'
import { ComponentWrapper } from '@/app/_components/ui/common/component-wrapper'
import { Button, Checkbox, Group, PasswordInput, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import Cookies from "js-cookie"
import jwt from "jsonwebtoken"
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { useState } from 'react'


export function LoginForm() {
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'メールアドレスの形式が無効です'),
      password: (value = '') =>
        value.length < 8 || !/\d/.test(value) || !/[a-zA-Z]/.test(value)
          ? 'パスワードは8文字以上で、数字と英字を含む必要があります'
          : null,
    },
  })
  const handleSubmit = async () => {
    setLoading(true)
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/login/`
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form.values
        }),
      });

      if (!response.ok) {
        notifications.show({
          message: "認証情報を確認してください。",
          color: "red"
        });
        throw new Error('Login failed');
      }
      const data = await response.json();
      Cookies.set('accessToken', data.access, { expires: 2 });
      Cookies.set('refreshToken', data.refresh, { expires: 7 });

      const decoded = jwt.decode(data.access);
      if (decoded && typeof decoded !== 'string') {
        if (decoded.is_admin === true) {
          router.push("/admin");
        } else if (decoded.guide_id) {
          router.push(`/guide/${decoded.guide_id}/`);
        } else if (decoded.user_id) {
          router.push(`/user/${decoded.user_id}/`);
        }
      }

    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  return (
    <ComponentWrapper>
      <Text size="md" fw={700} ta="center" pb="1rem">
        ログイン
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="メールアドレス"
          placeholder="example@mail.com"
          {...form.getInputProps('email')}
          required
        />
        {form.errors.email && (
          <Text c="red" size="sm" mt={5}>
            {form.errors.email}
          </Text>
        )}
        <PasswordInput
          label="パスワード"
          placeholder="Your password"
          {...form.getInputProps('password')}
          required
        />
        <Checkbox
          style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}
          label="利用規約に同意する"
          checked={confirmed}
          onChange={(event) => setConfirmed(event.currentTarget.checked)}
        />
        <Group justify="center">
          <Button type="submit" disabled={confirmed !== true} loading={loading}>
            ログイン
          </Button>
        </Group>
      </form>
      <Group justify="center" mt={16}>
        <Text component={Link} href="/register" size="xs" c="blue">
          新規登録はこちら
        </Text>
        <Text component={Link} href="/forgot-password" size="xs" c="blue">
          パスワードを忘れた方はこちら
        </Text>
      </Group>
    </ComponentWrapper>
  )
}
