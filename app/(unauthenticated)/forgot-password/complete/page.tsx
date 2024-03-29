import { ComponentWrapper } from '@/app/_components/ui/common/component-wrapper'
import { Text } from '@mantine/core'

export default function Page() {
  return (
    <>
      <ComponentWrapper>
        <Text size="md" fw={700} ta="center" pb="1rem">
          メール送信完了
        </Text>
        <Text size="xs" ta={'center'} maw="256px" mx="auto" lh={1.5} mb="1em">
          パスワード再設定用の
          <br />
          メールを送信しました。
          <br />
          <br />
          記載された内容に従い、
          <br />
          パスワードの再設定を
          <br />
          行ってください。
        </Text>
      </ComponentWrapper>
    </>
  )
}
