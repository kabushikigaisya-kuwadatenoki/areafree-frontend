import React from 'react'

export const metadata = {
  title: 'Exampleページ',
  description: 'Exampleページだよん',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* layout内容をかく */}
      {children}
    </>
  )
}
