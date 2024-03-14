'use client'
import { Alert, Box, Button, Group, Paper, Text, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { useState } from "react"

export function GuideRegisterForm() {
  const [responseError, setResponseError] = useState("")
  const form = useForm({
    initialValues: {
      guide_area: '',
      comment: '',
      introduction: '',
    },

    validate: {
      guide_area: (value) => (value ? null : 'ガイド地域を入力してください'),
      comment: (value) => (value ? null : 'コメントを入力してください'),
      introduction: (value) => (value ? null : '紹介文を入力してください'),
    },
  })

  const router = useRouter();

  const handleSubmit = async () => {
    // 毎回undefinedになる。httponlyを外したい
    const accessToken = Cookies.get('accessToken');
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/guides/create/`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(form.values),
    };
    try {
      const response = await fetch(endpoint, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'ガイド情報の登録に失敗しました。');
      }

      router.push("/guide/register/plan")
    } catch (error: any) {
      console.error(error.message);
      setResponseError(error.message);
    }
  };
  return (
    <>
      {responseError && (
        <Alert maw={350} mx="auto" mt={16} variant="filled" onClose={() => { setResponseError("") }} color="red" title="エラー" withCloseButton>
          このユーザーはすでにガイド登録されています。
        </Alert>
      )}
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
