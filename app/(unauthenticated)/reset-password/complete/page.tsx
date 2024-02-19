import { ComponentWrapper } from '@/app/_components/ui/common/component-wrapper'
import { Group, Text } from '@mantine/core'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <ComponentWrapper>
        <Text size="md" ta="center" fw={700} mb="md">
          パスワード再設定完了
        </Text>
        <Text size="sm" ta="center" mb="md">
          パスワード再発行が
          <br />
          完了しました
        </Text>
        <Group justify="center" mt={5}>
          <Text component={Link} href="/login" c="blue" size="xs">
            ログインはこちら
          </Text>
        </Group>
      </ComponentWrapper>
    </>
  )
}
