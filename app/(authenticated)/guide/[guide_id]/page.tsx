import { GuidePlanInfo } from '@/app/(authenticated)/_components/guide/guide-plan-info'
import { GuideProfileForm } from '@/app/(authenticated)/_components/guide/guide-profile-form'
import { GuideTabs } from '@/app/(authenticated)/_components/guide/guide-tabs'
import { EvaluateUserCard } from '@/app/(authenticated)/user/[user_id]/guide/[guide_id]/evaluation/_components/evaluate-user-card'
import { Group, Rating, Text } from '@mantine/core'
import { cookies } from "next/headers"


export default async function Page({ params, searchParams }: { params: { guide_id: string }, searchParams: { sort: string } }) {
  const cookieStore = cookies()
  const accessTokenObj = cookieStore.get("accessToken");
  // accessTokenObjから実際のトークン値を取得
  const accessToken = accessTokenObj ? accessTokenObj.value : null;

  const fetchGuideProfile = async (guide_id: string) => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/guides/${guide_id}/`
      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        cache: "no-store"
      }
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      console.error(error.message)
      throw error;
    }
  }

  const fetchReviews = async () => {
    const queryParam = searchParams.sort ? `&sort=${searchParams.sort}` : '';
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/reviews/?guide_id=${params.guide_id}${queryParam}`;
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
        throw new Error(`An error occurred: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Fetching guide index failed:', error);
      return {};
    }
  };

  const fetchPlans = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/user-plan/`;
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        cache: 'no-store'
      });
      return await response.json();
    } catch (error) {
      console.error('Fetching guide index failed:', error);
      return {};
    }
  }

  const EvaluationComponent = () => {
    return (
      <>
        <Group gap={2} maw={328} mx="auto" mt={16}>
          <Rating value={evaluation} fractions={4} />
          <Text size="12px">({reviewUsers?.length ?? 0})</Text>
        </Group>
        {reviewUsers && <EvaluateUserCard evaluateUser={reviewUsers} />}
      </>
    )
  }

  const guideProfile = await fetchGuideProfile(params.guide_id)
  const evaluation = guideProfile.evaluation
  const reviewUsers = await fetchReviews()
  const plan = await fetchPlans()
  return (
    <>
      <GuideTabs
        profile={<GuideProfileForm initialValues={guideProfile} guide_id={params.guide_id} />}
        evaluation={<EvaluationComponent />}
        plans={<GuidePlanInfo plan={plan.current_plan} />}
      />
    </>
  )
}
