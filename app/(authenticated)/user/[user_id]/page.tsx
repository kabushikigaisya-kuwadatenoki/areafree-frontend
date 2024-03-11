import { DetailFilter } from '@/app/(authenticated)/_components/user/detail-filter'
import { GuideCard } from '@/app/(authenticated)/_components/user/guide-card'
import { UserTabs } from '@/app/(authenticated)/_components/user/user-tabs'
import { SearchForm } from '@/app/_components/ui/common/search-form'
import { LoadingOverlay } from '@mantine/core'
import { Paper } from '@mantine/core'
import { cookies } from "next/headers"
import { Suspense } from 'react'

type Props = {
  params: {
    user_id: string
  },
  searchParams: {
    gender?: string
    status?: string
    evaluation?: string
  }
}
type GuideIndexItemsProps = {
  userId: string;
  searchParams: {
    gender?: string;
    status?: string;
    evaluation?: string;
  };
};





const fetchGuideIndex = async (userId: string, searchParams?: Props['searchParams']) => {
  const queryParams = new URLSearchParams(searchParams as any);
  queryParams.append('user_id', userId); // ユーザーIDを追加
  const queryString = queryParams.toString();

  const cookieStore = cookies()
  const accessToken = cookieStore.get("accessToken")

  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/guides${queryString ? `?${queryString}` : '/'}`;
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer${accessToken}`
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
};


const GuideIndexItems = async ({ userId, searchParams }: GuideIndexItemsProps) => {
  const guides = await fetchGuideIndex(userId, searchParams);
  return (
    <>
      <Paper bg="#CDE8E2" p="xs">
        <SearchForm />
        <DetailFilter />
      </Paper>
      <Suspense fallback={<LoadingOverlay />}>
        <GuideCard guides={guides} userId={userId} />
      </Suspense>
    </>
  );
};


const GuideSearchMap = () => {
  return (
    <>

    </>
  )
}

export default async function Page({ params, searchParams }: Props) {

  const { user_id } = params

  return (
    <>
      <UserTabs
        indexGuideComponents={<GuideIndexItems userId={user_id} searchParams={searchParams} />}
        searchMapComponents={<GuideSearchMap />}
      />
    </>
  )
}
