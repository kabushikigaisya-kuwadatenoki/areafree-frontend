

import { EvaluationModal } from '@/app/(authenticated)/_components/user/evaluation-modal'
import { GuideCardDetail } from '@/app/(authenticated)/_components/user/guide-card-detail'
import { KebabReport } from '@/app/(authenticated)/_components/user/kebab-report'
import { Stack } from '@mantine/core'

export default async function Page({ params }: { params: { guide_id: string } }) {
  const fetchGuideDetail = async (guide_id: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/guides/${guide_id}/`;

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
  const guide_dummy = {
    id: "1",
    nickname: 'ニックネーム太郎',
    evaluation: 3.7,
    created_at: '2024-02-22T15:00:00Z',
    available_languages: ['English', 'Japanese'],
    comment: 'Very knowledgeable and friendly guide!',
    is_favorite: true,
    profile_image: '/prof-dummy.png',
    address: '東京都新宿区',
  }

  const guide = await fetchGuideDetail(params.guide_id)
  console.log(guide)
  return (
    <>
      <EvaluationModal nickname={guide_dummy.nickname} id={guide_dummy.id} />
      <Stack justify="center" align="center" gap={0} mt="sm">
        <GuideCardDetail guides={guide_dummy} />
        <KebabReport nickname={guide_dummy.nickname} id={params.guide_id} />
      </Stack>
    </>
  )
}
