import { GuideProfileForm } from '@/app/(authenticated)/_components/guide/guide-profile-form'
import { GuideTabs } from '@/app/(authenticated)/_components/guide/guide-tabs'

export default function Page() {
  const GuideEvaluation = () => {
    return <p>Evaluation</p>
  }
  const GuidePlans = () => {
    return <p>Plans</p>
  }

  return (
    <>
      <GuideTabs
        profile={<GuideProfileForm />}
        evaluation={<GuideEvaluation />}
        plans={<GuidePlans />}
      />
    </>
  )
}
