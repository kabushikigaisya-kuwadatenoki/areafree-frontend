import { AuthedHeader } from '@/app/_components/ui/common/authed-header'
import { Footer } from '@/app/_components/ui/common/footer';
import React from 'react'

export const metadata = {
  title: 'test',
  description: 'testpage',
}

type Props = {
  children: React.ReactNode;
}


export default function Layout({ children }: Props) {


  return (
    <>
      <AuthedHeader />
      {children}
      <Footer />
    </>
  )
}
