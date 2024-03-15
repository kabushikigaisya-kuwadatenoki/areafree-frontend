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

type DecodedToken = {
  user_id: string
  is_admin: boolean
}


export default function Layout({ children }: Props) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("accessToken")

  if (accessToken) {
    try {
      const decoded = jwt.decode(accessToken.value) as DecodedToken;
      if (decoded.is_admin === false) {
        redirect("/login");
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
