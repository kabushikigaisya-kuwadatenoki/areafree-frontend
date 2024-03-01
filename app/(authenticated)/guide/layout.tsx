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
      {children}
    </>
  )
}
