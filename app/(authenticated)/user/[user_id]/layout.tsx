import { AuthedHeader } from '@/app/_components/ui/common/authed-header'
import React from 'react'

export const metadata = {
  title: 'test',
  description: 'testpage',
}

type Props = {
  children: React.ReactNode;
  params: { user_id: string };
}


export default function Layout({ children, params }: Props) {
  const userId = params.user_id;

  return (
    <>
      <AuthedHeader userId={userId} />
      {children}
    </>
  )
}
