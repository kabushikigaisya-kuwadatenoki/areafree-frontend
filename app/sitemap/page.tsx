'use client'
import { Box, Checkbox, Container, Stack, Table, Text, Textarea, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { randomId } from '@mantine/hooks'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const pages = [
  { name: 'ホーム', type: '一般', link: '/' },
  { name: 'ログイン', type: '一般', link: '/login' },
  { name: 'パスワード更新メール送信', type: '一般', link: '/forgot-password' },
  { name: 'パスワード更新メール送信完了', type: '一般', link: '/forgot-password/complete' },
  { name: 'パスワード再設定', type: '一般', link: '/reset-password' },
  { name: 'パスワード再設定完了', type: '一般', link: '/reset-password/complete' },
  { name: '新規登録', type: '一般', link: '/register' },
  { name: '会員登録完了', type: '一般', link: '/register/complete' },
  { name: '仮会員登録完了', type: '一般', link: '/register/temporary' },
  { name: 'ガイド登録', type: '一般', link: '/guide/register' },
  { name: 'ガイド登録完了', type: '一般', link: '/guide/register/complete' },
  { name: '利用規約', type: '一般', link: '/terms' },
  { name: '使用方法', type: '一般', link: '/how-to-use' },
  { name: 'プライバシーポリシー', type: '一般', link: '/privacy' },
]

const frontendEndpoint = process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT

export default function Page() {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [currentTime, setCurrentTime] = useState<string | null>(null)
  const selectRow = (pageLink: string) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(pageLink) ? prevSelectedRows : [...prevSelectedRows, pageLink],
    )
  }

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString())
  }, [])

  const form = useForm({
    initialValues: {
      testResults: pages.map(() => ({
        content: '',
        key: randomId(),
      })),
    },
  })

  return (
    <Container size="xl" pb="5rem" mt="lg">
      <Stack gap="xl">
        <Stack gap="xs">
          <Title order={2} fw="bold">
            サイトマップ | エリアフリー
          </Title>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th maw="1rem">
                  <Checkbox
                    size="xs"
                    aria-label="Select all rows"
                    checked={selectedRows.length === pages.length}
                    indeterminate={selectedRows.length > 0 && selectedRows.length < pages.length}
                    color="blue"
                    onChange={(event) => {
                      if (event.currentTarget.checked) {
                        // 全てをチェックする
                        setSelectedRows(pages.map((page) => page.link))
                      } else {
                        // 全てのチェックを外す
                        setSelectedRows([])
                      }
                    }}
                  />
                </Table.Th>
                <Table.Th maw="160px">ページ</Table.Th>
                <Table.Th maw="140px">リンク</Table.Th>
                <Table.Th>検証</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {pages.map((page, index) => (
                <Table.Tr
                  key={page.link}
                  bg={selectedRows.includes(page.link) ? 'blue.0' : undefined}
                  onClick={() => selectRow(page.link)}
                >
                  <Table.Td fz="xs" maw="1rem">
                    <Checkbox
                      size="xs"
                      aria-label="Select row"
                      checked={selectedRows.includes(page.link)}
                      color="blue"
                      onChange={(event) =>
                        setSelectedRows(
                          event.currentTarget.checked
                            ? [...selectedRows, page.link]
                            : selectedRows.filter((link) => link !== page.link),
                        )
                      }
                    />
                  </Table.Td>
                  <Table.Td fz="xs" maw="160px">
                    【{page.type}】{page.name}
                  </Table.Td>

                  <Table.Td fz="xs" maw="140px">
                    <Link href={page.link} target="_blank">
                      {frontendEndpoint + page.link}{' '}
                    </Link>
                  </Table.Td>
                  <Table.Td fz="xs">
                    <Textarea
                      w="100%"
                      size="xs"
                      autosize
                      placeholder="・全然ダメです。再度見直してください。"
                      {...form.getInputProps(`testResults.${index}.content`)}
                    />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Stack>
        <Stack gap="xs">
          <Title order={2} fw="bold">
            検証結果
          </Title>
          <Box>
            <Text>検証しました。修正お願いします。</Text>
            <Text>検証日時：{currentTime}</Text>
          </Box>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w="300px">ページ</Table.Th>
                <Table.Th w="300px">リンク</Table.Th>
                <Table.Th>検証</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {pages.map((page, index) => (
                <Table.Tr key={page.link} style={{ verticalAlign: 'top' }}>
                  <Table.Td fz="xs" w="300px">
                    【{page.type}】{page.name}
                  </Table.Td>

                  <Table.Td fz="xs" w="300px">
                    <Link href={page.link} target="_blank">
                      {frontendEndpoint + page.link}{' '}
                    </Link>
                  </Table.Td>
                  <Table.Td fz="xs" flex="1">
                    {form.getInputProps(`testResults.${index}.content`).value
                      ? form.getInputProps(`testResults.${index}.content`).value
                      : '問題なし'}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Stack>
      </Stack>
    </Container>
  )
}
