import NoticeForm from '@/app/(authenticated)/_components/admin/notice-form'
import { BreadBrumbs } from '@/app/_components/ui/common/bread-crumbs'

export default function Page() {
  return (
    <>
      <BreadBrumbs text="一覧" link="/admin" />
      <NoticeForm />
    </>
  )
}
