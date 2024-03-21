"use client"
import { CustomerPortal } from '@/app/(authenticated)/user/_component/customer-portal'
import { Button, Group, Modal, Paper, Radio, Stack, Table, TableData, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { loadStripe } from '@stripe/stripe-js';
import Cookies from 'js-cookie'
import Image from "next/image"
import { useState } from 'react'

const InfoImage = "/plan-info.png"
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

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
  const handleSubscribe = async (priceId: string) => {
    const stripe = await stripePromise;
    const accessToken = Cookies.get("accessToken");

    try {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/stripe/create-checkout-session/`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ price_id: priceId })
      });
      const session = await response.json()

      if (stripe && session.sessionId) {
        stripe.redirectToCheckout({ sessionId: session.sessionId });
      }
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
    } catch (error: any) {
      console.error(error)
    }
  }

  const [opened, { open, close }] = useDisclosure()
  const [value, setValue] = useState('')

  const getPriceId = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'price_1OqSnTGPLvjSIBB79Aokf0Lx';
      case 'light':
        return 'price_1OeqoQGPLvjSIBB7mi9jMyjS';
      case 'standard':
        return 'price_1Oeqn9GPLvjSIBB7BHVeiD7L';
      case 'premium':
        return 'price_1OeqnqGPLvjSIBB7dIx9jQOd';
      default:
        return '';
    }
  };
  return (
    <>
      <Modal opened={opened} onClose={close}>
        <Text size="lg" fw={700} ta="center" pb={5}>
          プラン選択
        </Text>
        <Text size="xs" fw={400} ta="center" pb={16}>
          利用プランを登録してください。
          <br />
          プランは登録後に変更できます。
        </Text>
        <Paper shadow="sm" p={5}>
          <Table data={tableData} style={{ fontSize: '10px' }} />
        </Paper>
        <Text size="xs" fw={400} py="1rem">
          プラン選択
        </Text>
        <Radio.Group value={value} onChange={setValue}>
          <Radio value="free" label="利用しない" mb={8} />
          <Radio value="light" label="ライトプラン" mb={8} />
          <Radio value="standard" label="スタンダードプラン" mb={8} />
          <Radio value="premium" label="プレミアムプラン" />
        </Radio.Group>
        <Group mt={16} justify='center'>
          <Button onClick={() => handleSubscribe(getPriceId(value))}>
            このプランにする
          </Button>
        </Group>
      </Modal>
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
      {plan !== null ? (
        <CustomerPortal />
      ) : (
        <Button variant='fill' fullWidth maw={357} mx="auto" onClick={open}>プランに加入</Button>
      )}
      <Paper maw={357} mx="auto" shadow="sm" p={5} mt={32}>
        <Table data={tableData} style={{ fontSize: '10px' }} />
      </Paper>
    </>
  )
}