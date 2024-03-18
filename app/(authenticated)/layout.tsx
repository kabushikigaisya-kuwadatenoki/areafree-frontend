import { AuthedHeader } from '@/app/_components/ui/common/authed-header';
import { Footer } from '@/app/_components/ui/common/footer';
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import React from "react"

type Props = {
  children: React.ReactNode;
};

export const revalidate = 1000


export default function Layout({ children }: Props) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("accessToken")

  if (!accessToken) {
    redirect("/login")
    return;
  }

  return (
    <>
      <AuthedHeader />
      {children}
      <Footer />
    </>
  );
}
