"use client";

import { AuthedHeader } from '@/app/_components/ui/common/authed-header';
import { Footer } from '@/app/_components/ui/common/footer';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';


type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // アクセストークンの存在を確認
    const accessToken = Cookies.get('accessToken');

    // アクセストークンがなければログインページにリダイレクト
    if (!accessToken && pathname !== '/login') {
      router.push('/login');
    }
  }, [router, pathname]);

  return (
    <>
      <AuthedHeader />
      {children}
      <Footer />
    </>
  );
}
