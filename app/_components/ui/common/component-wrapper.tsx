import { Paper } from '@mantine/core'
import React from 'react'

export function ComponentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Paper p="lg" shadow="lg" maw={290} mx="auto" my={34}>
      {children}
    </Paper>
  )
}
