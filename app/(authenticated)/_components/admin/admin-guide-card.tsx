'use client'
import { AdminUserCard } from '@/app/(authenticated)/_components/admin/admin-user-card'
import { ExtendedGuideNotificationType } from '@/app/(authenticated)/_type/type'
import { Badge, Box, Card, Group, Modal, Rating, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconStar } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
  guides: ExtendedGuideNotificationType | ExtendedGuideNotificationType[]
}

type AdminGuideCardComponentProps = {
  item: ExtendedGuideNotificationType
}

export function AdminGuideCard({ guides }: Props) {
  const [opened, { open, close }] = useDisclosure()
  const guidesArray = Array.isArray(guides) ? guides : [guides]
  const router = useRouter()

  const AdminGuideCardComponent = ({ item }: AdminGuideCardComponentProps) => {
    return (
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
          cursor: 'pointer',
        }}
        onClick={open}
        key={item.id}
      >
        <Group align="start" justify="space-between">
          {item.badge && (
            <Badge
              size="xs"
              p={2}
              variant="danger"
              style={{ background: 'red', position: 'absolute', top: 5, left: 5 }}
              radius={2}
            >
              新着
            </Badge>
          )}
          <Image
            src={item.profile_image}
            alt={`${item.last_name} ${item.first_name}`}
            width={82}
            height={71}
          />
          <Box w="60%">
            <Text size="10px" mb="xs">
              ガイド評価
            </Text>
            <Rating size="xs" value={item.evaluation} fractions={4} />
            <Group>
              <Text size="md" fw={700} mb="sm">
                {item.last_name}
                {item.first_name}
              </Text>
              <IconStar fontWeight={100} width={16} height={16} />
            </Group>
            <Stack>
              <Box>
                <Text size="10px">ガイド歴</Text>
                <Text size="10px" mt="5px">
                  {item.created_at}
                </Text>
              </Box>
              <Group>
                <Stack gap={5}>
                  <Text size="10px" c="blue">
                    通報した回数
                  </Text>
                  <Text size="10px">{item.report_count}回</Text>
                </Stack>
                <Stack gap={5}>
                  <Text size="10px" c="blue">
                    通報された回数
                  </Text>
                  <Text size="10px">{item.reported_count}回</Text>
                </Stack>
              </Group>
            </Stack>
          </Box>
        </Group>
        <Text size="10px" my={10}>
          コメント
        </Text>
        <Text size="xs" lts={0.5}>
          {item.comment}
        </Text>
      </Card>
    )
  }

  return (
    <>
      {guidesArray.map((item) => (
        <>
          <AdminGuideCardComponent item={item} />
          <Modal opened={opened} onClose={close}>
            <AdminGuideCardComponent item={item} />
            {item.reportedUsers?.map((user) => (
              <AdminUserCard users={user} />
            ))}
          </Modal>
        </>
      ))}
    </>
  )
}
