"use client"
import { Button, Group, Modal, Paper, Stack, Table, TableData, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Image from "next/image"
import Link from "next/link"

const InfoImage = "/plan-info.png"

const tableData: TableData = {
  head: ['', 'ライトプラン', 'スタンダードプラン', 'プレミアムプラン'],
  body: [
    ['料金', '1000円/月', '3000円/月', '6000円/月'],
    ['ガイド可能回数', '1回/月', '4回/月', '12回/月'],
  ],
}

export function GuidePlanInfo() {
  const [opened, { open, close }] = useDisclosure()
  return (
    <>
      <Modal opened={opened} onClose={close}>
        <Paper p={15} withBorder maw={357} mx="auto">
          <Group justify='center'>
            <Text size='md' fw={700}>{"プラン名"}を退会しますか？</Text>
            <Text size='xs'>
              退会すると、プラン利用なしのガイドとなります。
            </Text>
            <Text size='xs'>
              また、現状のプランに紐づくすべての情報は破棄され、復旧できません。
            </Text>
          </Group>
        </Paper>
        <Group justify='flex-end' mt={10}>
          <Button variant='outline' onClick={close}>キャンセル</Button>
          <Button variant='fill' bg="red">退会</Button>
        </Group>
      </Modal>
      <Paper style={{ position: "relative" }}>
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
      <Button maw={357} mx="auto" fullWidth variant='fill'>プラン変更はこちら</Button>
      <Text p={10} ta="right" size='xs' c="blue">お支払情報変更</Text>
      <Text p={10} ta="right" size='xs' c="red" onClick={open}>プランを退会する</Text>
      <Paper maw={357} mx="auto" shadow="sm" p={5} mt={32}>
        <Table data={tableData} style={{ fontSize: '10px' }} />
      </Paper>
    </>
  )
}