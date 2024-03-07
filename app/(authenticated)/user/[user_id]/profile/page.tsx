import { UserProfileForm } from '@/app/_components/ui/forms/user-profile-form'

export default async function Page({ params }: { params: { user_id: string } }) {
  const fetchUserProfile = async (user_id: string) => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/users/${user_id}/`
      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store"
      }
      const response = await fetch(endpoint, options)
      return response.json()
    } catch (error: any) {
      console.error(error.message)
    }
  }

  const { user_id } = params
  const data = await fetchUserProfile(user_id)
  return <UserProfileForm initialValues={data} user_id={user_id} />
}
