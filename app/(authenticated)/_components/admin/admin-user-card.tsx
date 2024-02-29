'use client'
import { UserNotificationType } from '@/app/(authenticated)/_type/type'
import { Card, Group, Modal, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Image from 'next/image'
const user_dummy_image = '/user_dummy.png'

type Props = {
  users: UserNotificationType | UserNotificationType[]
}

export function AdminUserCard({ users }: Props) {
  const [opened, { open, close }] = useDisclosure()
  const UsersArray = Array.isArray(users) ? users : [users]
  return (
    <>
      {UsersArray.map((user) => (
        <>
          <Card
            withBorder
            maw={352}
            mx="auto"
            shadow="xs"
            p="md"
            mt="xs"
            radius="md"
            style={{
              position: 'relative',
            }}
            key={user.id}
            onClick={open}
          >
            <Stack>
              <Group>
                <Image src={user_dummy_image} alt="ユーザーのアイコン" width={26} height={26} />
                <Text size="12px" fw={700}>
                  {user.last_name}
                  {user.first_name}
                </Text>
              </Group>
              <Group>
                <Group>
                  <Text size="10px" c="blue">
                    利用回数
                  </Text>
                  <Text size="10px">{user.service_used}</Text>
                </Group>
                <Group>
                  <Text size="10px" c="blue">
                    利用開始年月日
                  </Text>
                  <Text size="10px">{user.created_at}</Text>
                </Group>
              </Group>
              <Group>
                <Text size="10px" c="blue">
                  利用プラン
                </Text>
                <Text size="10px">{user.plan}</Text>
              </Group>
              <Group>
                <Text size="10px" c="blue">
                  通報した回数
                </Text>
                <Text size="10px">{user.report_count}回</Text>
              </Group>
            </Stack>
          </Card>
          <Modal opened={opened} onClose={close}>
            <Text>{user.first_name}</Text>
          </Modal>
        </>
      ))}
    </>
  )
}
