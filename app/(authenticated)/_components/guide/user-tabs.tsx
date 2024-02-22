'use client'
import { Tabs } from '@mantine/core'
import React from 'react'

type Props = {
  indexGuideComponents: React.ReactNode // ここでPropsの型を定義
}

export function UserTabs({ indexGuideComponents }: Props) {
  return (
    <Tabs defaultValue="indexGuide">
      <Tabs.List grow justify="center">
        <Tabs.Tab value="indexGuide">ガイド一覧</Tabs.Tab>
        <Tabs.Tab value="searchMap">地図検索</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="indexGuide">{indexGuideComponents}</Tabs.Panel>
      <Tabs.Panel value="searchMap">
        {/* ここに他の内容を表示 */}
        test
      </Tabs.Panel>
    </Tabs>
  )
}
