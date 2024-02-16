import { Footer } from '@/app/_components/ui/common/footer'
import { UnAuthHeader } from '@/app/_components/ui/common/unauth-header'
import React from 'react'

export const metadata = {
  title: 'test',
  description: 'testpage',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UnAuthHeader />
      {children}
      <Footer />
    </>
  )
}
