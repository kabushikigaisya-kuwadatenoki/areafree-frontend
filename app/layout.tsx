import '@/app/global.css'
import { theme } from '@/theme'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css';
import React from 'react'

export const metadata = {
  title: {
    default: '案件名',
    template: '%s | 案件名',
  },
  description: '案件紹介する文章を入れる',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications position='top-center' />
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
