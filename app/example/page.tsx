'use client'

import { SearchBar } from '@/app/_components/ui/common/search-form'
import { ExampleCard, HogeCard } from '@/app/example/_components'
import { Button, Card, Menu, Progress, Rating, Text, TextInput, Title, rem } from '@mantine/core'
import { useForm } from '@mantine/form'
import {
  IconCalendar,
  IconChevronDown,
  IconPackage,
  IconSquareCheck,
  IconUsers,
} from '@tabler/icons-react'

export default function Page() {
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
      stars: 0,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'メールアドレスを入力してください'),
    },
  })
  return (
    <>
      <SearchBar />
      <p className="text-red">aaa</p>
      <ExampleCard title="テストです。" />
      <HogeCard title="テストです。" />
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Rating value={3} color="primary" {...form.getInputProps('stars')} />
        <TextInput label="e-mail" {...form.getInputProps('email')} />
        <Button type="submit">Submit</Button>
      </form>
      <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)">
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
          Monthly goal
        </Text>
        <Text fz="lg" fw={500}>
          $5.431 / $10.000
        </Text>
        <Progress value={54.31} mt="md" size="lg" radius="xl" />
      </Card>
      <Title>体験ショップ</Title>
      <Text>未対応</Text>
      <Menu
        transitionProps={{ transition: 'pop-top-right' }}
        position="top-end"
        width={220}
        withinPortal
      >
        <Button color="red">aa</Button>
        <Menu.Target>
          <Button
            rightSection={
              <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            }
            pr={12}
            color="blue.8"
          >
            Create new
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconPackage
                style={{ width: rem(16), height: rem(16) }}
                // color={theme.colors.blue[6]}
                stroke={1.5}
              />
            }
            rightSection={
              <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                Ctrl + P
              </Text>
            }
          >
            Project
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconSquareCheck
                style={{ width: rem(16), height: rem(16) }}
                // color={theme.colors.pink[6]}
                stroke={1.5}
              />
            }
            rightSection={
              <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                Ctrl + T
              </Text>
            }
          >
            Task
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconUsers
                style={{ width: rem(16), height: rem(16) }}
                // color={theme.colors.cyan[6]}
                stroke={1.5}
              />
            }
            rightSection={
              <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                Ctrl + U
              </Text>
            }
          >
            Team
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconCalendar
                style={{ width: rem(16), height: rem(16) }}
                // color={theme.colors.violet[6]}
                color="blue"
                stroke={1.5}
              />
            }
            rightSection={
              <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                Ctrl + E
              </Text>
            }
          >
            Event
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}
