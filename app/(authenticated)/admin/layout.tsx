import jwt from 'jsonwebtoken';
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import React from 'react'

export const metadata = {
  title: 'test',
  description: 'testpage',
}

type Props = {
  children: React.ReactNode;
}


export default function Layout({ children }: Props) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("accessToken")

  if (accessToken) {
    try {
      const decoded = jwt.decode(accessToken.value);
      if (typeof decoded !== 'object' || decoded === null || !('is_admin' in decoded) || decoded.is_admin === false) {
        redirect('/login');
      }
    } catch (error) {
      console.error("Error decoding the token: ", error);
      redirect('/login');
    }
  } else {
    redirect('/login');
  }

  return (
    <>
      {children}
    </>
  )
}
