import { Flex, Paper } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

const logo = '/logo.png'

export function UnAuthHeader() {
  return (
    <Paper shadow="lg" px="md">
              <Link href="/">
        <Image src={logo} width={85} height={37} alt="logo" />
        </Link>
      <Flex justify="space-between" align="center" h="52px">
        <Image src={logo} width={85} height={37} alt="logo" />
      </Flex>
    </Paper>
  )
}
