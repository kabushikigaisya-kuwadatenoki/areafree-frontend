import { GuideEvaluationCard } from '@/app/(authenticated)/_components/guide/guide-evaluation-card'
import { GuidePlanInfo } from '@/app/(authenticated)/_components/guide/guide-plan-info'
import { GuideProfileForm } from '@/app/(authenticated)/_components/guide/guide-profile-form'
import { GuideTabs } from '@/app/(authenticated)/_components/guide/guide-tabs'


export default function Page({ params }: { params: { guide_id: string } }) {
  const guideEvaluations = {
    guide_id: "guide-uuid",
    user: {
      user_id: "user-uuid",
      nickname: "ガイドのニックネーム",
      profile_image: "/path/to/profile_image.jpg"
    },
    support_status: "available",
    guide_area: "東京",
    comment: "ガイドからのコメント",
    introduction: "ガイドの紹介文",
    evaluation: 2.3,  // ガイドの総評価（Reviewの平均）
    plan: "none",
    reviews: [
      {
        nickname: "レビュワーA",
        created_at: "2023-01-01",
        profile_image: "/user_dummy.png",
        evaluation: 4,
        comment: "素晴らしい体験でした。"
      },
      {
        nickname: "レビュワーB",
        created_at: "2023-02-15",
        profile_image: "/user_dummy.png",
        evaluation: 4.5,
        comment: "とても楽しかったです！"
      }
    ]
  }

  const { reviews, evaluation } = guideEvaluations;



  return (
    <>
      <GuideTabs
        profile={<GuideProfileForm />}
        evaluation={<GuideEvaluationCard evaluation={evaluation} guideEvaluate={reviews} />}
        plans={<GuidePlanInfo />}
      />
    </>
  )
}
