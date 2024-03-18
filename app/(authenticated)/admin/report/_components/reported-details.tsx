"use client"
import { formatDate } from '@/app/_functions/format-date';
import { Box, Button, Card, Group, Rating, Stack, Text, TextInput, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Cookies from "js-cookie"
import Image from "next/image"
import Link from 'next/link';
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
    is_frozen: Date | null;
  };
  report_user: {
    user_id: string;
    first_name: string;
    last_name: string;
    current_plan: string;
    user_created_at: string;
    reported_count: number;
    reported_by_count: number;
    profile_image: string | null;
  };
};

interface ReportedDetailsProps {
  report: ReportData;
}

export const ReportedDetails = ({ report }: ReportedDetailsProps) => {
  const handleFrozen = async () => {
    const accessToken = Cookies.get("accessToken")
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/guides/${report.report_target.guide_id}/`;
    try {
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ is_frozen: new Date().toISOString() }),
        cache: "no-store"
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error response:', errorResponse);
        throw new Error(`An error occurred: ${response.statusText}. Details: ${JSON.stringify(errorResponse)}`);
      }
      if (response.ok) {
        notifications.show({
          title: "アカウント凍結",
          message: "アカウントを凍結しました",
          color: "red"
        })
      }
      return await response.json();
    } catch (error) {
      console.error('Fetching guide index failed:', error);
      return {};
    }
  }
  return (
    <>
      <Text size='sm'>通報対象者</Text>
      <Card
        withBorder
        maw={352}
        mx="auto"
        shadow="xs"
        p="md"
        mt="xs"
        radius="md"
        style={{
          position: 'relative',
          cursor: 'pointer',
        }}
        key={report.report_target.id}
      >
        <Group align="start" justify="space-between">
          <Image
            src={report.report_target.profile_image ? report.report_target.profile_image : '/prof-dummy.png'}
            alt={`${report.report_target.last_name} ${report.report_target.first_name}`}
            width={82}
            height={71}
          />
          <Box w="60%">
            <Text size="10px" mb="xs">
              ガイド評価
            </Text>
            <Rating
              size="xs" value={report.report_target.evaluation} fractions={4} />
            <Group>
              <Text size="md" fw={700} mb="sm">
                {report.report_target.last_name}
                {report.report_target.first_name}
              </Text>
            </Group>
            <Stack>
              <Box>
                <Text size="10px">ガイド歴</Text>
                <Text size="10px" mt="5px">
                  {formatDate(report.report_target.guide_created_at)}
                </Text>
              </Box>
              <Group>
                <Stack gap={5}>
                  <Text size="10px" c="blue">
                    通報した回数
                  </Text>
                  <Text size="10px">{report.report_target.reported_by_count}回</Text>
                </Stack>
                <Stack gap={5}>
                  <Text size="10px" c="blue">
                    通報された回数
                  </Text>
                  <Text size="10px">{report.report_target.reported_count}回</Text>
                </Stack>
              </Group>
            </Stack>
          </Box>
        </Group>
        <Text size="10px" my={10}>
          コメント
        </Text>
        <Text size="xs" lts={0.5}>
          {report.report_target.guide_comment}
        </Text>
      </Card>
      <Text size='sm' mt='md'>通報者</Text>
      <Card
        withBorder
        maw={352}
        mx="auto"
        shadow="xs"
        p="md"
        mt="xs"
        radius="md"
        style={{
          position: 'relative',
          cursor: 'pointer',
        }}
        key={report.report_user.user_id}
      >
        <Group>
          <Image src={report.report_user.profile_image ? report.report_user.profile_image : '/user_dummy.png'} alt={`${report.report_user.last_name} ${report.report_user.first_name}`} width={26} height={26} />
          <Text fw={700} size='xs'>{report.report_user.last_name}{report.report_user.first_name}</Text>
        </Group>
        <Group justify='space-between' mt={16}>
          <Group>
            <Text size='10px' c='blue'>利用回数</Text>
            <Text size='10px'>0回</Text>
          </Group>
          <Group>
            <Text size='10px' c='blue'>利用開始年月</Text>
            <Text size='10px'>{formatDate(report.report_user.user_created_at)}</Text>
          </Group>
        </Group>
        <Group mt={8}>
          <Text size='10px' c='blue'>利用プラン</Text>
          <Text size='10px'>{report.report_user.current_plan}</Text>
        </Group>
        <Group justify='space-between' mt={8}>
          <Group>
            <Text size='10px' c='blue'>通報した回数</Text>
            <Text size='10px'>{report.report_user.reported_count}回</Text>
          </Group>
          <Group>
            <Text size='10px' c='blue'>通報された回数</Text>
            <Text size='10px'>{report.report_user.reported_by_count}回</Text>
          </Group>
        </Group>
      </Card>
      <TextInput label="通報種類" value={report.reason} disabled mt={16} />
      <Textarea label="コメント" value={report.report_comment} disabled autosize minRows={5} mt={8} styles={{ input: { opacity: '1', color: '#555' } }} />
      <Group justify='flex-end' mt={16}>
        <Button variant='outline' component={Link} href='/admin'>戻る</Button>
        <Button variant='fill' bg='red' onClick={handleFrozen} disabled={report.report_target.is_frozen ? true : false}>
          {report.report_target.is_frozen ? 'アカウント凍結済み' : 'アカウント凍結'}
        </Button>
      </Group>
    </>
  );
};