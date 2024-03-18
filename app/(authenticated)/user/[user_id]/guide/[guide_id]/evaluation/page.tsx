import { EvaluateUserCard } from "@/app/(authenticated)/user/[user_id]/guide/[guide_id]/evaluation/_components/evaluate-user-card"
import { BreadBrumbs } from "@/app/_components/ui/common/bread-crumbs"
import { Group, Rating, Text, TextInput } from "@mantine/core"
import { cookies } from "next/headers"

export default async function Page({ params, searchParams }: { params: { user_id: string, guide_id: string }, searchParams: { sort: string } }) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("accessToken")


  const fetchGuideDetail = async (guide_id: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/guides/detail/${guide_id}/`;
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
        throw new Error(`An error occurred: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Fetching guide index failed:', error);
      return {};
    }
  };


  const fetchReviews = async () => {
    const queryParam = searchParams.sort ? `&sort=${searchParams.sort}` : '';
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/reviews/?guide_id=${params.guide_id}${queryParam}`;
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
        throw new Error(`An error occurred: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Fetching guide index failed:', error);
      return {};
    }
  };

  const reviewUsers = await fetchReviews()
  const guides = await fetchGuideDetail(params.guide_id)
  return (
    <>
      <BreadBrumbs text="ガイド評価" link={`/user/${params.user_id}/guide/${params.guide_id}`} />
      <TextInput maw={328} mx="auto" disabled value={guides.guide_nickname} label="ガイド名" size="xs" />
      <Text maw={328} mx="auto" size="10px" mt={10}>総合評価</Text>
      <Group gap={2} maw={328} mx="auto" mt={5}>
        <Rating value={guides.evaluation} fractions={4} size={"lg"} /><Text size="12px">({reviewUsers.length})</Text>
      </Group>
      <EvaluateUserCard evaluateUser={reviewUsers} />
    </>
  )
}
