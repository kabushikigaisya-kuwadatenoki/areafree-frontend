'use client'
import { Button, Group, Modal, Rating, Text, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'

export function EvaluationModal({ nickname, id }: { nickname: string; id: number }) {
  const [opened, { open, close }] = useDisclosure(false)
  const handleSubmit = (values: typeof form.values) => {
    console.log(values)
    close()
  }
  const form = useForm({
    initialValues: {
      id: id,
      nickname: nickname,
      evaluation: 0,
      Comment: '',
    },
    validate: {
      evaluation: (value) => (value > 0 ? null : '評価は必須です'),
    },
  })
  return (
    <>
      <Button
        onClick={open}
        variant="filled"
        display="block"
        mt="sm"
        w="100%"
        maw="320px"
        mx="auto"
      >
        このガイドを評価する
      </Button>
      <Modal opened={opened} onClose={close} title="ガイド評価登録">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput label="ガイド名" {...form.getInputProps('nickname')} disabled />
          <Group gap={0} mt="xs">
            <Text fw={100}>評価</Text>
            <Text c="red">*</Text>
          </Group>
          <Rating {...form.getInputProps('evaluation')} />
          {form.errors.rating && (
            <div style={{ color: 'red', marginTop: 4 }}>{form.errors.rating}</div>
          )}
          <Textarea label="コメント" autosize minRows={5} {...form.getInputProps('comment')} />
          <Group justify="flex-end">
            <Button type="submit" mt={16}>
              通報
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}
