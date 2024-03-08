"use client"

import { Flex, Paper, Text } from '@mantine/core'
import { IconLogout, IconUserCircle } from '@tabler/icons-react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react';

const logo = '/logo.png'

export function AuthedHeader() {

  const router = useRouter();
  const [userId, setUserId] = useState<string | undefined>();
  const [guideId, setGuideId] = useState<string | undefined>();

  const logout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')

    router.push("/login")
  }

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken) as { user_id: string, guide_id: string };
      setUserId(decodedToken.user_id);
      setGuideId(decodedToken.guide_id);
    }
  }, []);
  return (
    <Paper shadow="lg" px="md">
      <Flex justify="space-between" align="center" h="52px">
        <Link href={`/user/${userId}`}>
          <Image src={logo} width={85} height={37} alt="logo" />
        </Link>
        <Flex gap="sm" align="center">
          {guideId ? (
            <Link href={`/guide/${guideId}`}>
              <Text size="10px" c="blue">ガイドダッシュボード</Text>
            </Link>
          ) : (
            <Link href={"/guide/register"}>
              <Text size="10px" c="blue">ガイドになる</Text>
            </Link>
          )}
          <Link href={`/user/${userId}/profile`}>
            <IconUserCircle size={24} strokeWidth={2} color={'#555555'} />
          </Link>
          <IconLogout onClick={() => { logout() }} size={24} strokeWidth={2} color="#A0AEC0" />
        </Flex>
      </Flex>
    </Paper>
  )
}
