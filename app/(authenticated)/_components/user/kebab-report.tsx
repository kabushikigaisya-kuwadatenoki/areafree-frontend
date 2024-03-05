'use client'
import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Modal,
  NativeSelect,
  TextInput,
  Textarea,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { IconBell, IconDotsVertical, IconPhone } from '@tabler/icons-react'

export function KebabReport({ nickname, id }: { nickname: string; id: string }) {
  const [opened, { open, close }] = useDisclosure(false)
  const handleReport = (values: typeof form.values) => {
    console.log(values)
  }
  const form = useForm({
    initialValues: {
      id: id,
      nickname: nickname,
      reason: '',
      comment: '',
    },
  })
  return (
    <>
      <Modal opened={opened} onClose={close} title="通報">
        <form onSubmit={form.onSubmit(handleReport)}>
          <TextInput label="通報対象者" {...form.getInputProps('nickname')} disabled />
          <NativeSelect
            label="通報理由"
            {...form.getInputProps('reason')}
            data={[
              '未選択（デフォルト）',
              '気に入らない',
              'スパムである',
              'ヌードまたは性的行為',
              '詐欺・欺瞞',
              'ヘイトスピーチまたは差別的な行為',
              '虚偽の情報',
              'いじめまたは嫌がらせ',
              '暴力または危険な団体との関係',
              '知的財産権の侵害',
              '違法または規制対象商品の販売',
              '自殺または自傷行為をほのめかす内容',
              'その他',
            ]}
            withAsterisk
            required
          />
          <Textarea label="コメント" {...form.getInputProps('comment')} autosize minRows={5} />
          <Group justify="flex-end" mt={16}>
            <Button onClick={close} variant="outline">
              閉じる
            </Button>
            <Button type="submit">
              通報
            </Button>
          </Group>
        </form>
      </Modal>
      <Group
        justify="center"
        style={{ borderTop: '1px solid #E0E0E0', position: 'relative' }}
        w="100%"
        mt={16}
        pt={8}
        maw={300}
      >
        <Group gap={30}>
          <ActionIcon variant="default" style={{ border: 'unset' }}>
            <IconPhone stroke={1} />
          </ActionIcon>
          <ActionIcon variant="default" style={{ border: 'unset' }}>
            <IconBell stroke={1} />
          </ActionIcon>
        </Group>
        <Menu>
          <Menu.Target>
            <ActionIcon
              variant="default"
              radius="unset"
              color="grey"
              style={{ border: 'unset', position: 'absolute', right: 0 }}
              ml="auto"
            >
              <IconDotsVertical stroke={1} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>ブロック</Menu.Item>
            <Menu.Item color="red" fw={700} onClick={open}>
              通報
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </>
  )
}
