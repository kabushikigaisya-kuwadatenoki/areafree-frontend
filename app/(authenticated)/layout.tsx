import { AuthedHeader } from '@/app/_components/ui/common/authed-header'
import { Footer } from '@/app/_components/ui/common/footer'
import React from 'react'

export const metadata = {
  title: 'test',
  description: 'testpage',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthedHeader />
      {children}
      <Footer />
    </>
  )
}
