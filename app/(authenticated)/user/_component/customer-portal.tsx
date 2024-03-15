"use client"
import { Button } from "@mantine/core";
import Cookies from "js-cookie"

export function CustomerPortal() {

  const handleAccessCustomerPortal = async () => {
    const accessToken = Cookies.get("accessToken");

    try {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/stripe/customer-portal/`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to access customer portal');
      }
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error accessing the customer portal:', error);
    }
  }

  return (
    <Button maw={357} mx="auto" fullWidth variant='fill' onClick={handleAccessCustomerPortal}>プラン変更・キャンセルはこちら</Button>
  )
}