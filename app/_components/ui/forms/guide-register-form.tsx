'use client'
import { apiRequestWithRefresh } from '@/app/_functions/refresh-token'
import { Box, Button, Group, Notification, Paper, Text, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import Cookies from "js-cookie"
import Link from 'next/link'
import { useRouter } from "next/navigation"

export function GuideRegisterForm() {
  const form = useForm({
    initialValues: {
      guide_area: '',
      comment: '',
      introduction: '',
      plan: '',
    },

    validate: {
      guide_area: (value) => (value ? null : 'ガイド地域を入力してください'),
      comment: (value) => (value ? null : 'コメントを入力してください'),
      introduction: (value) => (value ? null : '紹介文を入力してください'),
    },
  })

  // const router = useRouter();

  const handleSubmit = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/guides/create/`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.values),
    };
    try {
      const response = await apiRequestWithRefresh(endpoint, options);

      if (!response.ok) {
        throw new Error('ガイド情報の登録に失敗しました。');
      }
      // const data = await response.json();
      // router.push(`/guides/${data.id}`);

    } catch (error: any) {
      return (
        <Notification>
          {error.message}
        </Notification>
      );
    }
  };
  return (
    <>
      <Box maw={290} mx="auto">
        <Paper shadow="lg" p="1rem" my="2rem" radius="lg">
          <Text ta="center" size="xl" fw={700}>
            ガイド登録
          </Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="ガイド地域"
              placeholder="地域"
              required
              value={form.values.guide_area}
              onChange={(event) => form.setFieldValue('guide_area', event.currentTarget.value)}
              error={form.errors.guide_area}
            />
            <TextInput
              label="コメント"
              placeholder="コメント"
              required
              withAsterisk
              value={form.values.introduction}
              onChange={(event) => form.setFieldValue('introduction', event.currentTarget.value)}
              error={form.errors.introduction}
            />
            <Textarea
              label="紹介文"
              placeholder="紹介文"
              required
              value={form.values.comment}
              onChange={(event) => form.setFieldValue('comment', event.currentTarget.value)}
              error={form.errors.comment}
            />
            <Text>
            </Text>
            <Group justify='center' mt={10}>
              <Button variant="outline" component={Link} href="/register/complete">
                戻る
              </Button>
              <Button type="submit">次へ</Button>
            </Group>
          </form>
        </Paper>
      </Box>
    </>
  )
}
