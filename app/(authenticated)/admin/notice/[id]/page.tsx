import { NoticeForm } from '@/app/(authenticated)/_components/admin/notice-form'
import { BreadBrumbs } from '@/app/_components/ui/common/bread-crumbs'
export default function Page({ params }: { params: { id: string } }) {
  const noticeData = {
    title: 'サンプルタイトル',
    notice_date: new Date(), // ここに適切な日付を設定
    notice_time: '12:00',
    content: 'ここに通知の内容を記述',
  }
  return (
    <>
      <BreadBrumbs text="一覧" link="/admin" />
      <NoticeForm initialValues={noticeData} />
    </>
  )
}
