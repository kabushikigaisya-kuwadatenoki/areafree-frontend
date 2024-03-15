"use client"
import { CustomerPortal } from '@/app/(authenticated)/user/_component/customer-portal'
import { Group, Paper, Stack, Table, TableData, Text } from '@mantine/core'

import Image from "next/image"

const InfoImage = "/plan-info.png"

const tableData: TableData = {
  head: ['', 'ライトプラン', 'スタンダードプラン', 'プレミアムプラン'],
  body: [
    ['料金', '1000円/月', '3000円/月', '6000円/月'],
    ['ガイド可能回数', '1回/月', '4回/月', '12回/月'],
  ],
}

const getPlanPrice = (plan: string) => {
  switch (plan) {
    case 'ライトプラン':
      return '1000';
    case 'スタンダードプラン':
      return '3000';
    case 'プレミアムプラン':
      return '6000';
    default:
      return '0';
  }
}

type Props = {
  plan?: string
}

export function GuidePlanInfo({ plan }: Props) {
  return (
    <>
      <Paper style={{ position: "relative" }} maw={357} mx="auto">
        <Image alt='PlanInfo' src={InfoImage} width={280} height={155} />
        <Stack gap={5} w={200} justify='center' style={{ position: "absolute", right: 0, top: 0, bottom: 0, margin: "auto 0" }}>
          <Text size='sm'>あなたは</Text>
          <Text size="20px" ta="center" fw={700}>{plan ? plan : "フリープラン"}</Text>
          <Text size='sm' ta="right">です。</Text>
        </Stack>
      </Paper >
      <Group maw={357} mx="auto" justify='space-between'>
        <Text size="md" fw={400} py="1rem">
          月額利用料
        </Text>
        <Group>
          <Text size='32px' fw={700}>
            {plan ? getPlanPrice(plan) : "0"}
          </Text>
          <Text size='md'>円</Text>
        </Group>
      </Group>
      <CustomerPortal />
      <Paper maw={357} mx="auto" shadow="sm" p={5} mt={32}>
        <Table data={tableData} style={{ fontSize: '10px' }} />
      </Paper>
    </>
  )
}