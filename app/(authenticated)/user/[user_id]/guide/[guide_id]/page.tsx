

import { EvaluationModal } from '@/app/(authenticated)/_components/user/evaluation-modal'
import { GuideCardDetail } from '@/app/(authenticated)/_components/user/guide-card-detail'
import { KebabReport } from '@/app/(authenticated)/_components/user/kebab-report'
import { Stack } from '@mantine/core'

export default async function Page({ params }: { params: { guide_id: string, user_id: string } }) {
  const fetchGuideDetail = async (guide_id: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/guides/detail/${guide_id}/`;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
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

  const guide = await fetchGuideDetail(params.guide_id)

  return (
    <>
      <EvaluationModal nickname={guide.guide_nickname} guideId={guide.id} />
      <Stack justify="center" align="center" gap={0} mt="sm">
        <GuideCardDetail guides={guide} />
        <KebabReport userId={params.user_id} nickname={guide.guide_nickname} guideId={guide.id} />
      </Stack>
    </>
  )
}
