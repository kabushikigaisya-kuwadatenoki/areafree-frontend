import { ComponentWrapper } from '@/app/_components/ui/common/component-wrapper'
import { Text } from '@mantine/core'

export default function Page() {
  return (
    <ComponentWrapper>
      <Text size="lg" fw={700} ta="center" pb={5}>
        登録完了
      </Text>
      <Text size="xs" fw={400} ta="center" pb={16} lh={1.5}>
        ガイド登録が完了しました。
        <br />
        ログイン後、状況に応じて対応可能状況を
        <br />
        変更してください。
        <br />
        <br />
        プラン・お支払方法はマイページのプラン情報よりいつでも変更できます。
      </Text>
    </ComponentWrapper>
  )
}
