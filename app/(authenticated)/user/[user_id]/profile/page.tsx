import { UserProfileForm } from '@/app/_components/ui/forms/user-profile-form'

export default function Page({ params }: { params: { user_id: number } }) {
  return <UserProfileForm />
}