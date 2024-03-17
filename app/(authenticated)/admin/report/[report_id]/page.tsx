// app/admin/report/[report_id]/page.tsx
import { ReportedDetails } from '@/app/(authenticated)/admin/report/_components/reported-details';
import { Container, Title } from '@mantine/core';

export default async function Page({ params }: { params: { report_id: string } }) {
  const report = await fetchReportData(params.report_id);
  console.log(report)
  return (
    <Container>
      <Title order={2} mb="md">
        Report Details
      </Title>
      {report && <ReportedDetails report={report} />}
    </Container>
  );
}

async function fetchReportData(reportId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/reports/${reportId}`);

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