// app/admin/report/[report_id]/page.tsx
import { ReportedDetails } from '@/app/(authenticated)/admin/report/_components/reported-details';
import { Container, Title } from '@mantine/core';
import { cookies } from 'next/headers';
export default async function Page({ params }: { params: { report_id: string } }) {
  const report = await fetchReportData(params.report_id);
  console.log(report)
  return (
    <Container mt={16}>
      <Title fw={700} order={2} mb="md">
        通報詳細
      </Title>
      {report && <ReportedDetails report={report} />}
    </Container>
  );
}

async function fetchReportData(reportId: string) {
  const cookieStore = cookies()
  const accessTokenObj = cookieStore.get("accessToken");
  const accessToken = accessTokenObj ? accessTokenObj.value : null;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/reports/${reportId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 2000 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.id) {
      throw new Error('Invalid report data received');
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch report data:', error);
    return null;
  }
}