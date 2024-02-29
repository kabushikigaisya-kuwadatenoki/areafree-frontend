import { AdminGuideCard } from '@/app/(authenticated)/_components/admin/admin-guide-card'
import { AdminTabs } from '@/app/(authenticated)/_components/admin/admin-tabs'
import { AdminUserCard } from '@/app/(authenticated)/_components/admin/admin-user-card'
import { UserNotificationType } from '@/app/(authenticated)/_type/type'
import { ExtendedGuideNotificationType } from '@/app/(authenticated)/_type/type'

export default function Page() {
  const notifications = [
    {
      id: '1097gakkjhKUHkjgna',
      type: 'guide',
      first_name: '太郎',
      last_name: '山田',
      evaluation: 3.7,
      created_at: '2024-02-22T15:00:00Z',
      report_count: 3,
      reported_count: 1,
      comment: '結構自己評価高めです',
      is_favorite: true,
      profile_image: '/prof-dummy.png',
      address: '東京都新宿区',
      badge: true,
      reportedUsers: [
        {
          id: 'allijcvkh33',
          type: 'user',
          first_name: '太郎',
          last_name: '山田',
          plan: 'プレミアム',
          report_count: 2,
          notice_count: 3,
          created_at: '2023-01-01',
          service_used: 5,
          badge: false,
        },
        {
          id: 'kjy90327fgbkahh',
          type: 'user',
          first_name: '花子',
          last_name: '佐藤',
          plan: 'スタンダード',
          report_count: 0,
          notice_count: 1,
          created_at: '2023-02-15',
          service_used: 12,
          badge: true,
        },
      ],
    },
    {
      id: 'allijcvkh33',
      type: 'user',
      first_name: '太郎',
      last_name: '山田',
      plan: 'プレミアム',
      report_count: 2,
      created_at: '2023-01-01',
      service_used: 5,
      badge: false,
    },
    {
      id: 'kjy90327fgbkahh',
      type: 'user',
      first_name: '花子',
      last_name: '佐藤',
      plan: 'スタンダード',
      report_count: 0,
      created_at: '2023-02-15',
      service_used: 12,
      badge: true,
    },
  ]

  const ReportComponent = () => {
    return (
      <>
        {notifications.map((notification) => {
          if (notification.type === 'guide') {
            // notification を ExtendedGuideNotificationType として扱う
            const guideNotification = notification as ExtendedGuideNotificationType
            return <AdminGuideCard key={guideNotification.id} guides={guideNotification} />
          }
          if (notification.type === 'user') {
            // notification を UserNotificationType として扱う
            const userNotification = notification as UserNotificationType
            return <AdminUserCard key={userNotification.id} users={userNotification} />
          }
        })}
      </>
    )
  }

  return (
    <>
      <AdminTabs
        indexReportComponents={<ReportComponent />}
        indexNoticeComponents={<ReportComponent />}
      />
    </>
  )
}
