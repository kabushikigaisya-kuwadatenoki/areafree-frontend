'use client'
import { ComponentWrapper } from '@/app/_components/ui/common/component-wrapper'
import { Button, Group, Textarea, Title } from '@mantine/core'
import { useForm } from '@mantine/form'

export default function Page() {
  const form = useForm({
    initialValues: {
      inquiry: '',
      email: '',
      username: '',
    },
  })

  return (
    <ComponentWrapper>
      <Title size="md" fw={700} ta="center" mb="md">
        お問合わせフォーム
      </Title>
      <form action="">
        <Textarea
          label="お問合せ内容"
          required
          autosize
          minRows={10}
          {...form.getInputProps('inquiry')}
        />
        <Group justify="center" mt="md">
          <Button type="submit">送信</Button>
        </Group>
      </form>
    </ComponentWrapper>
  )
}
