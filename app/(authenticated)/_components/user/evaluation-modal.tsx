'use client'
import { apiRequestWithRefresh } from '@/app/_functions/refresh-token'
import { Button, Group, Modal, Rating, Text, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import Cookies from 'js-cookie'

export function EvaluationModal({ nickname, guideId }: { nickname: string; guideId: string }) {
  const [opened, { open, close }] = useDisclosure(false)
  const form = useForm({
    initialValues: {
      evaluation: 0,
      comment: '',
    },
    validate: {
      evaluation: (value) => (value > 0 ? null : '評価は必須です'),
    },
  })

  const handleSubmit = async () => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/reviews/`
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
        body: JSON.stringify({ ...form.values, guide: guideId }),
      }

      const response = await apiRequestWithRefresh(endpoint, options)

      if (response.ok) {
        close() // モーダルを閉じる
      } else {
        // エラーレスポンスの処理
        const errorData = await response.json()
        console.error('Review submission failed:', errorData)
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }
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
          <TextInput label="ガイド名" value={nickname} disabled />
          <Group gap={0} mt="xs">
            <Text fw={100}>評価</Text>
            <Text c="red">*</Text>
          </Group>
          <Rating {...form.getInputProps('evaluation')} />
          {form.errors.rating && (
            <div style={{ color: 'red', marginTop: 4 }}>{form.errors.rating}</div>
          )}
          <Textarea label="コメント" autosize minRows={5} {...form.getInputProps('comment')} />
          <Group justify="flex-end" mt={16}>
            <Button onClick={close} variant="outline" >
              閉じる
            </Button>
            <Button type="submit">
              登録
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}
