import { Bar } from '@/app/(authenticated)/_components/notice/bar'

export default function Page() {
  const notice = [
    {
      id: 1,
      title: '新着のお知らせ',
      date: '2022-01-01',
      time: '12:00',
      badge: true,
    },
    {
      id: 2,
      title: '新着のお知らせ',
      date: '2022-01-01',
      time: '12:00',
      badge: true,
    },
    {
      id: 3,
      title: '新着のお知らせ',
      date: '2022-01-01',
      time: '12:00',
      badge: true,
    },
  ]
  return <Bar notice={notice} />
}
