import { Flex, Paper } from '@mantine/core'
import { IconBell, IconLogout, IconUserCircle } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

const logo = '/logo.png'

export function AuthedHeader(params: { userId: string }) {
  return (
    <Paper shadow="lg" px="md">
      <Flex justify="space-between" align="center" h="52px">
        <Link href="/">
          <Image src={logo} width={85} height={37} alt="logo" />
        </Link>
        <Flex gap="sm" align="center">
          <Link href={`/user/${params.userId}`}>
            <IconBell size={24} strokeWidth={2} color={'#F59E0B'} />
          </Link>
          <IconUserCircle size={24} strokeWidth={2} color={'#555555'} />
          <IconLogout size={24} strokeWidth={2} color="#A0AEC0" />
        </Flex>
      </Flex>
    </Paper>
  )
}
