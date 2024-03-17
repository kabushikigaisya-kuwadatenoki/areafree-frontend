
import { Text } from '@mantine/core';

type ReportData = {
  id: string;
  reason: string;
  report_comment: string;
  report_target: {
    id: string;
    first_name: string;
    last_name: string;
    profile_image: string | null;
    evaluation: number;
    guide_id: string;
    guide_created_at: string;
    reported_count: number;
    reported_by_count: number;
    guide_comment: string;
  };
  report_user: {
    user_id: string;
    first_name: string;
    last_name: string;
    current_plan: string;
    reported_count: number;
    reported_by_count: number;
  };
};

interface ReportedDetailsProps {
  report: ReportData;
}

export const ReportedDetails = ({ report }: ReportedDetailsProps) => {
  return (
    <>
      <Text>{report.report_user.first_name}</Text>
      <Text>{report.report_user.last_name}</Text>
      <Text>{report.report_user.current_plan}</Text>
      <Text>{report.report_user.reported_count}</Text>
      <Text>{report.report_user.reported_by_count}</Text>
      <Text>{report.reason}</Text>
      <Text>{report.report_comment}</Text>
    </>
  );
};