'use client'
import { ComponentWrapper } from '@/app/_components/ui/common/component-wrapper'
import { Button, Group, Paper, Radio, Table, TableData, Text } from '@mantine/core'
import { loadStripe } from '@stripe/stripe-js';
import Cookies from "js-cookie";
import { useState } from 'react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const tableData: TableData = {
  head: ['', 'ライトプラン', 'スタンダードプラン', 'プレミアムプラン'],
  body: [
    ['料金', '1000円/月', '3000円/月', '6000円/月'],
    ['ガイド可能回数', '1回/月', '4回/月', '12回/月'],
  ],
}

export function GuidePlanForm() {
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
        return ''; // 利用しない場合は空文字を返す
    }
  };

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





  return (
    <ComponentWrapper>
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
    </ComponentWrapper>
  )
}
