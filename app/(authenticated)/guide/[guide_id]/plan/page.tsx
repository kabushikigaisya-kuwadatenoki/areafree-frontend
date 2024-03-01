import { Button, Card, Group, Paper, Stack, Table, TableData, Text } from '@mantine/core'
import Image from "next/image"
const InfoImage = "/plan-info.png"

const tableData: TableData = {
  head: ['', 'ライトプラン', 'スタンダードプラン', 'プレミアムプラン'],
  body: [
    ['料金', '1000円/月', '3000円/月', '6000円/月'],
    ['ガイド可能回数', '1回/月', '4回/月', '12回/月'],
  ],
}

export default function Page({ params }: { params: { guide_id: string } }) {
  return (
    <>
      <Paper radius={0} style={{ position: "relative" }} bg="#CDE8E2">
        <Image alt='PlanInfo' src={InfoImage} width={280} height={155} />
        <Stack gap={5} w={196} justify='center' style={{ position: "absolute", right: 0, top: 0, bottom: 0, margin: "auto 0" }}>
          <Text size='sm'>あなたは</Text>
          <Text size="20px" ta="center" fw={700}>ライト会員</Text>
          <Text size='sm' ta="right">です。</Text>
        </Stack>
      </Paper >
      <Group maw={357} mx="auto" justify='space-between'>
        <Text size="md" fw={400} py="1rem">
          月額利用料
        </Text>
        <Group>
          <Text size='32px' fw={700}>
            1000円
          </Text>
          <Text size='md'>円</Text>
        </Group>
      </Group>
      <Paper bg="#CDE8E2" radius={0} py={20}>
        <Paper maw={340} mx="auto" shadow="sm" p={5}>
          <Table data={tableData} style={{ fontSize: '10px' }} />
        </Paper>
        <Card maw={340} mx="auto" mt={20}>
          <Text size='md' fw={700} c="blue">プラン見出し</Text>
          <Text lts={1.5} size='xs' mt={10}>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </Text>
          <Button mt={20} variant='fill' fullWidth>詳細はこちら</Button>
        </Card>
        <Card maw={340} mx="auto" mt={20}>
          <Text size='md' fw={700} c="blue">プラン見出し</Text>
          <Text lts={1.5} size='xs' mt={10}>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </Text>
          <Button mt={20} variant='fill' fullWidth>詳細はこちら</Button>
        </Card>
        <Card maw={340} mx="auto" mt={20}>
          <Text size='md' fw={700} c="blue">プラン見出し</Text>
          <Text lts={1.5} size='xs' mt={10}>
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
          </Text>
          <Button mt={20} variant='fill' fullWidth>詳細はこちら</Button>
        </Card>
      </Paper>
    </>
  )
}
