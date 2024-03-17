import { GuidePlanInfo } from '@/app/(authenticated)/_components/guide/guide-plan-info'
import { GuideProfileForm } from '@/app/(authenticated)/_components/guide/guide-profile-form'
import { GuideTabs } from '@/app/(authenticated)/_components/guide/guide-tabs'
import { EvaluateUserCard } from '@/app/(authenticated)/user/[user_id]/guide/[guide_id]/evaluation/_components/evaluate-user-card'
import { Group, Rating, Text } from '@mantine/core'
import { cookies } from "next/headers"

export default async function Page({ params, searchParams }: { params: { guide_id: string }, searchParams: { sort: string } }) {
  const cookieStore = cookies();
  const accessTokenObj = cookieStore.get("accessToken");
  const accessToken = accessTokenObj ? accessTokenObj.value : null;

  const guideRes = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT}/api/guide/${params.guide_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const guideData = await guideRes.json();

  const reviewsRes = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT}/api/reviews?guide_id=${params.guide_id}&sort=${searchParams.sort}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const reviewsData = await reviewsRes.json();

  const plansRes = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT}/api/plans`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const plansData = await plansRes.json();

  const EvaluationComponent = () => {
    return (
      <>
        <Group gap={2} maw={328} mx="auto" mt={16}>
          <Rating value={guideData.evaluation} fractions={4} />
          <Text size="12px">({reviewsData?.length ?? 0})</Text>
        </Group>
        {reviewsData && <EvaluateUserCard evaluateUser={reviewsData} />}
      </>
    )
  }


  console.log(guideData)

  return (
    <>
      <GuideTabs
        profile={<GuideProfileForm initialValues={guideData} guide_id={params.guide_id} />}
        evaluation={<EvaluationComponent />}
        plans={<GuidePlanInfo plan={plansData.current_plan} />}
      />
    </>
  )
}