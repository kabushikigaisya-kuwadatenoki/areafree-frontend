'use client'
import { apiRequestWithRefresh } from '@/app/_functions/refresh-token'
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
import { notifications } from '@mantine/notifications';
import { IconDotsVertical, IconPhone } from '@tabler/icons-react'
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation"
export function KebabReport({ guideId, userId, nickname }: { guideId: string; nickname: string, userId: string }) {
  const [opened, { open, close }] = useDisclosure(false)
  const router = useRouter()
  const form = useForm({
    initialValues: {
      reason: '',
      report_comment: '',
    },
  })

  const accessToken = Cookies.get("accessToken")
  const handleReport = async (nickname: string) => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/reports/`
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ...form.values, guide: guideId }),
      }
      const response = await apiRequestWithRefresh(endpoint, options)
      if (response?.ok) {
        notifications.show({
          message: `${nickname}を通報しました！`,
        })
        close()
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const handleBlock = async () => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/blocked_guides/`;
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ guide: guideId }),
      };
      const response = await apiRequestWithRefresh(endpoint, options);
      if (response?.ok) {
        notifications.show({
          message: `${nickname}をブロックしました！`,
        });
        router.push(`/user/${userId}`);
      } else {
        // エラー時の処理
        const errorResult = await response?.json();
        notifications.show({
          message: errorResult.error,
        });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="通報">
        <form onSubmit={form.onSubmit(() => handleReport(nickname))}>
          <TextInput label="通報対象者" value={nickname} disabled />
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
          <Textarea label="コメント" {...form.getInputProps('report_comment')} autosize minRows={5} />
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
          {/* <ActionIcon variant="default" style={{ border: 'unset' }}>
            <IconBell stroke={1} />
          </ActionIcon> */}
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
            <Menu.Item onClick={handleBlock}>ブロック</Menu.Item>
            <Menu.Item color="red" fw={700} onClick={open}>
              通報
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </>
  )
}
