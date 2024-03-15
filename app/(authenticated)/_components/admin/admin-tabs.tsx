'use client'
// import { SearchNotice } from '@/app/_components/ui/common/search-notice'
import { SearchReport } from '@/app/_components/ui/common/search-report'
import { Tabs } from '@mantine/core'
import React from 'react'

type Props = {
  indexReportComponents: React.ReactNode // ここでPropsの型を定義
  // indexNoticeComponents: React.ReactNode
}

export function AdminTabs({ indexReportComponents }: Props) {
  return (
    <Tabs defaultValue="indexReport">
      <Tabs.List grow justify="center">
        <Tabs.Tab py={15} value="indexReport">
          通報一覧
        </Tabs.Tab>
        {/* <Tabs.Tab py={15} value="indexNotice">
          一斉通知
        </Tabs.Tab> */}
      </Tabs.List>

      <Tabs.Panel value="indexReport">
        <SearchReport />
        {indexReportComponents}
      </Tabs.Panel>
      {/* <Tabs.Panel value="indexNotice">
        <SearchNotice />
        {indexNoticeComponents}
      </Tabs.Panel> */}
    </Tabs>
  )
}
