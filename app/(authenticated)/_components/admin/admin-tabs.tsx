'use client'
import { Tabs } from '@mantine/core'
import React from 'react'

type Props = {
  indexReportComponents: React.ReactNode // ここでPropsの型を定義
  indexNoticeComponents: React.ReactNode
}

export function AdminTabs({ indexReportComponents, indexNoticeComponents }: Props) {
  return (
    <Tabs defaultValue="indexReport">
      <Tabs.List grow justify="center">
        <Tabs.Tab value="indexReport">通報一覧</Tabs.Tab>
        <Tabs.Tab value="indexNotice">一斉通知</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="indexReport">{indexReportComponents}</Tabs.Panel>
      <Tabs.Panel value="indexNotice">{indexNoticeComponents}</Tabs.Panel>
    </Tabs>
  )
}
