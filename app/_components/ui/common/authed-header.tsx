"use client"

import { Flex, Paper, Text } from '@mantine/core'
import { IconBell, IconLogout, IconUserCircle } from '@tabler/icons-react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation"

const logo = '/logo.png'

export function AuthedHeader() {

  const router = useRouter();

  const logout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')

    router.push("/login")
  }

  const accessToken = Cookies.get("accessToken");
  let userId: string | undefined;

  if (accessToken) {
    const decodedToken = jwtDecode(accessToken) as { user_id: string, guie_id: string };
    userId = decodedToken.user_id;
  }
  return (
    <Paper shadow="lg" px="md">
      <Flex justify="space-between" align="center" h="52px">
        <Link href={`/user/${userId}`}>
          <Image src={logo} width={85} height={37} alt="logo" />
        </Link>
        <Flex gap="sm" align="center">
          <Link href={"/guide/register"}>
            <Text size="10px" c="blue">ガイドになる</Text>
          </Link>
          <Link href={"/user"}>
            <IconBell size={24} strokeWidth={2} color={'#F59E0B'} />
          </Link>
          <Link href={`/user/${userId}/profile`}>
            <IconUserCircle size={24} strokeWidth={2} color={'#555555'} />
          </Link>
          <IconLogout onClick={() => { logout() }} size={24} strokeWidth={2} color="#A0AEC0" />
        </Flex>
      </Flex>
    </Paper>
  )
}
