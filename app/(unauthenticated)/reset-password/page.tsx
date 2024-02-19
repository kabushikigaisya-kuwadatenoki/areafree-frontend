'use client'
import { ComponentWrapper } from '@/app/_components/ui/common/component-wrapper'
import { Button, Group, PasswordInput, Text } from '@mantine/core'
import { useForm } from '@mantine/form'

export default function Page() {
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value = '') =>
        value.length < 8 || !/\d/.test(value) || !/[a-zA-Z]/.test(value)
          ? 'パスワードは8文字以上で、数字と英字を含む必要があります'
          : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'パスワードと確認用パスワードが一致しません' : null,
    },
  })

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
        <form action="submit">
          <PasswordInput
            label="新しいパスワード"
            required
            {...form.getInputProps('password')}
            mb="md"
          />
          <PasswordInput
            label="新しいパスワード（確認用）"
            required
            {...form.getInputProps('confirmPassword')}
          />
          <Group justify="center" mt="md">
            <Button type="submit">設定</Button>
          </Group>
        </form>
      </ComponentWrapper>
    </>
  )
}
