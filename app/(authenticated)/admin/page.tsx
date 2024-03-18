"use server"
import { AdminGuideCard } from '@/app/(authenticated)/_components/admin/admin-guide-card'
import { AdminTabs } from '@/app/(authenticated)/_components/admin/admin-tabs'
import { Text } from "@mantine/core"
import { cookies } from 'next/headers'

type ReportedGuide = {
  id: string;
  evaluation: number;
  first_name: string;
  last_name: string;
  guide_id: string;
  guide_created_at: string;
  reported_count: number;
  reported_by_count: number;
  guide_comment: string;
  profile_image: string
}

export default async function Page() {

  const fetchReport = async () => {
    const cookieStore = cookies()
    const accessTokenObj = cookieStore.get("accessToken");
    const accessToken = accessTokenObj ? accessTokenObj.value : null;

    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/reports/`;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
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


  const ReportComponent = async () => {
    const reports = await fetchReport();

    if (reports && reports.length > 0) {
      return (
        <>
          {reports.map((report: ReportedGuide) => {
            return <AdminGuideCard key={report.id} guides={report} />
          })}
        </>
      );
    }
    return (
      <Text ta="center" mt={16} fw={700}>
        報告されたガイドはいません
      </Text>
    );
  }


  return (
    <>
      <AdminTabs
        indexReportComponents={<ReportComponent />}
      />
    </>
  )
}
