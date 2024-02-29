import { Bar } from '@/app/(authenticated)/_components/notice/bar'
import { BreadBrumbs } from '@/app/_components/ui/common/bread-crumbs'
export default function Page({ params }: { params: { user_id: number } }) {
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
  return (
    <>
      <BreadBrumbs text="通知" link={`/user/${params.user_id}`} />
      <Bar userId={params.user_id} notice={notice} />
    </>
  )
}
