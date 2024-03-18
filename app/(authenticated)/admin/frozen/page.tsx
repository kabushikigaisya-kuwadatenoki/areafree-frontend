import { FrozenGuide } from '@/app/(authenticated)/_components/admin/frozen-guide'
import { cookies } from 'next/headers'


export default async function Page() {
  const fetchFrozen = async () => {
    const cookieStore = cookies()
    const accessTokenObj = cookieStore.get("accessToken");
    const accessToken = accessTokenObj ? accessTokenObj.value : null;

    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/reports/frozen_guides/`;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
        next: { revalidate: 2000 }
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error response:', errorResponse);
        throw new Error(`An error occurred: ${response.statusText}. Details: ${JSON.stringify(errorResponse)}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Fetching guide index failed:', error);
      return {};
    }
  }

  const frozen_guide = await fetchFrozen()
  console.log(frozen_guide)

  return <FrozenGuide guides={frozen_guide} />
}
