'use client'
import { Button, Group, Paper, Text, TextInput, Textarea } from '@mantine/core'
import { DateInput, DatesProvider, TimeInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { useRouter } from 'next/navigation'

export default function NoticeForm() {
  const router = useRouter()
  const form = useForm({
    initialValues: {
      title: '',
      notice_date: null,
      notice_time: '',
      content: '',
    },
  })

  const handleSubmit = () => {
    console.log(form.values)
    router.push('/admin')
  }
  return (
    <Paper withBorder maw={352} p={12} mx="auto" radius={10} mt={10}>
      <Text fw={700} ta="center">
        一切通知新規作成
      </Text>
      <DatesProvider settings={{ firstDayOfWeek: 1, locale: 'ja', timezone: 'Asia/Tokyo' }}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            required
            label="通知タイトル"
            placeholder="タイトル"
            {...form.getInputProps('title')}
          />
          <Group>
            <DateInput
              required
              label="通知年月日"
              placeholder="0000/00/00"
              valueFormat="YYYY/MM/DD"
              {...form.getInputProps('notice_date')}
            />
            <TimeInput
              required
              placeholder="00:00"
              label="時間"
              {...form.getInputProps('notice_time')}
            />
          </Group>
          <Textarea
            autosize
            required
            label="本文"
            placeholder="本文"
            minRows={5}
            {...form.getInputProps('content')}
          />
          <Group justify="center" mt={10}>
            <Button type="submit" variant="filled">
              登録
            </Button>
          </Group>
        </form>
      </DatesProvider>
    </Paper>
  )
}
