'use client'
import { Tabs } from '@mantine/core'
import React from 'react'

type Props = {
  profile: React.ReactNode // ここでPropsの型を定義
  evaluation: React.ReactNode
  plans: React.ReactNode
}

export function GuideTabs({ profile, evaluation, plans }: Props) {
  return (
    <Tabs defaultValue="profile">
      <Tabs.List grow justify="center">
        <Tabs.Tab value="profile">ガイド一覧</Tabs.Tab>
        <Tabs.Tab value="evaluation">地図検索</Tabs.Tab>
        <Tabs.Tab value="plans">地図検索</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="profile">{profile}</Tabs.Panel>
      <Tabs.Panel value="evaluation">{evaluation}</Tabs.Panel>
      <Tabs.Panel value="plans">{plans}</Tabs.Panel>
    </Tabs>
  )
}
