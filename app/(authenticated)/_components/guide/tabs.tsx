'use client'
import { Tabs } from '@mantine/core'

export function GuideTabs() {
  return (
    <Tabs defaultValue="profile">
      <Tabs.List grow justify="center">
        <Tabs.Tab value="profile">プロフィール</Tabs.Tab>
        <Tabs.Tab value="review">評価情報</Tabs.Tab>
        <Tabs.Tab value="plan">プラン情報</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="profile">Tab 1 content</Tabs.Panel>
      <Tabs.Panel value="review">Tab 1 content</Tabs.Panel>
      <Tabs.Panel value="plan">Tab 1 content</Tabs.Panel>
    </Tabs>
  )
}
