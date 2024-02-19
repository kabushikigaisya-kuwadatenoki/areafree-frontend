'use client'
import { ComponentWrapper } from '@/app/_components/ui/common/component-wrapper'
import { Button, Group, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

export default function Page() {
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'メールアドレスの形式が無効です'),
    },
  })
  const handleSubmit = async (values: { email: string }) => {
    console.log(values)
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
            <Button type="submit">送信</Button>
          </Group>
        </form>
      </ComponentWrapper>
    </>
  )
}
