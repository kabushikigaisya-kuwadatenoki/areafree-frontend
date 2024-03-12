import { DetailFilter } from '@/app/(authenticated)/_components/user/detail-filter'
import { GuideCard } from '@/app/(authenticated)/_components/user/guide-card'
import { UserTabs } from '@/app/(authenticated)/_components/user/user-tabs'
import { SearchForm } from '@/app/_components/ui/common/search-form'
import { Group, LoadingOverlay } from '@mantine/core'
import { Paper } from '@mantine/core'
import { cookies } from "next/headers"
import Image from "next/image"
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
      <Suspense fallback={<LoadingOverlay />}>
        <GuideCard guides={guides} userId={userId} />
      </Suspense>
    </>
  );
};


const GuideSearchMap = async ({ userId, searchParams }: GuideIndexItemsProps) => {
  const dummy_map = "/dummy-map.png"
  const guides = await fetchGuideIndex(userId, searchParams);
  return (
    <>
      <Group justify='center' mt={12}>
        <Image src={dummy_map} alt='dummy' width={352} height={191} />
      </Group>
      <Suspense fallback={<LoadingOverlay />}>
        <GuideCard guides={guides} userId={userId} />
      </Suspense>
    </>
  )
}

export default async function Page({ params, searchParams }: Props) {

  const { user_id } = params

  return (
    <>
      <Paper bg="#CDE8E2" p="xs">
        <SearchForm />
        <DetailFilter />
      </Paper>
      <UserTabs
        indexGuideComponents={<GuideIndexItems userId={user_id} searchParams={searchParams} />}
        searchMapComponents={<GuideSearchMap userId={user_id} searchParams={searchParams} />}
      />
    </>
  )
}
