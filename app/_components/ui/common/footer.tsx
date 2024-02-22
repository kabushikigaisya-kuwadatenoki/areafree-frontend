import { Flex, SimpleGrid, Text } from '@mantine/core'
import Link from 'next/link'

export function Footer() {
  return (
    <>
      <Flex
        h="95px"
        align="center"
        justify="center"
        bg="url(/advertise-image.png)"
        bgsz="contain"
        mt="md"
      >
        <Text c="white" size="40px" fw={700}>
          広告
        </Text>
      </Flex>
      <SimpleGrid cols={{ base: 2 }} spacing={{ base: 6 }} p="md">
        <Text size="xs" fw={700} component={Link} href="/hoge">
          当システムの使用方法
        </Text>
        <Text size="xs" fw={700} component={Link} href="/hoge">
          利用規約
        </Text>
        <Text size="xs" fw={700} component={Link} href="/hoge">
          お問合せはこちら
        </Text>
        <Text size="xs" fw={700} component={Link} href="/hoge">
          個人情報の取り扱いについて
        </Text>
        <Text size="xs" fw={700} component={Link} href="/hoge">
          FAQ
        </Text>
        <Text size="xs" fw={700} component={Link} href="/hoge">
          運営会社
        </Text>
      </SimpleGrid>
    </>
  )
}
