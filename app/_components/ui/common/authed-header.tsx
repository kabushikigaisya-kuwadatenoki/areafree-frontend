import { Flex, Paper } from '@mantine/core'
import { IconBell, IconLogout, IconUserCircle } from '@tabler/icons-react'
import Image from 'next/image'

const logo = '/logo.png'

export function AuthedHeader() {
  return (
    <Paper shadow="lg" px="md">
      <Flex justify="space-between" align="center" h="52px">
        <Image src={logo} width={85} height={37} alt="logo" />
        <Flex gap="sm" align="center">
          <IconBell size={24} strokeWidth={2} color={'#F59E0B'} />
          <IconUserCircle size={24} strokeWidth={2} color={'#555555'} />
          <IconLogout size={24} strokeWidth={2} color="#A0AEC0" />
        </Flex>
      </Flex>
    </Paper>
  )
}
