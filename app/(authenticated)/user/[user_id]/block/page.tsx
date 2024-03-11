import { BreadBrumbs } from '@/app/_components/ui/common/bread-crumbs'
import { cookies } from "next/headers"
import { BlockedGuideCard } from './_components/blocked-guide-card'

export default async function Page({ params }: { params: { user_id: string } }) {
  const fetchBlockedGuide = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/blocked_guides/`
    const cookieStore = cookies()
    const accessTokenObj = cookieStore.get("accessToken");

    // accessTokenObjから実際のトークン値を取得
    const accessToken = accessTokenObj ? accessTokenObj.value : null;
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        cache: 'no-store'
      });
      if (!response.ok) {
        // エラーレスポンスの詳細を取得してログに記録
        const errorResponse = await response.json();
        console.error('Error response:', errorResponse);
        throw new Error(`An error occurred: ${response.statusText}. Details: ${JSON.stringify(errorResponse)}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Fetching guide index failed:', error);
      return {};
    }
  }

  const bloked_guide = await fetchBlockedGuide()
  return (
    <>
      <BreadBrumbs text="ブロックリスト" link={`/user/${params.user_id}`} />
      {Object.keys(bloked_guide).length > 0 && <BlockedGuideCard guides={bloked_guide} />}
    </>
  )
}
