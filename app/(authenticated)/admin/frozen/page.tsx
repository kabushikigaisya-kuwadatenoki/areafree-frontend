import { FrozenGuide } from '@/app/(authenticated)/_components/admin/frozen-guide'

export default function Page() {
  const frozen_guide_dummy = [
    {
      id: '1',
      first_name: '一郎',
      last_name: '山田',
      evaluation: 3.7,
      created_at: '2024-02-22T15:00:00Z',
      comment: 'Very knowledgeable and friendly guide!',
      profile_image: '/prof-dummy.png',
    },
    {
      id: '2',
      first_name: '一郎',
      last_name: '山田',
      evaluation: 3.7,
      created_at: '2024-02-22T15:00:00Z',
      comment: 'Very knowledgeable and friendly guide!',
      profile_image: '/prof-dummy.png',
    },
    {
      id: '3',
      first_name: '一郎',
      last_name: '山田',
      evaluation: 3.7,
      created_at: '2024-02-22T15:00:00Z',
      comment: 'Very knowledgeable and friendly guide!',
      profile_image: '/prof-dummy.png',
    },
  ]
  return <FrozenGuide guides={frozen_guide_dummy} />
}
