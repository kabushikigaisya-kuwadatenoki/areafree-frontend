import { AuthedHeader } from '@/app/_components/ui/common/authed-header';
import { Footer } from '@/app/_components/ui/common/footer';
import Cookies from 'js-cookie';
import { redirect } from "next/navigation"
import React from "react"

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {



  return (
    <>
      <AuthedHeader />
      {children}
      <Footer />
    </>
  );
}
