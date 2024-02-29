export type GuideNotificationType = {
  id: string
  type: 'guide'
  first_name: string
  last_name: string
  evaluation: number
  created_at: string
  comment: string
  profile_image: string
  address: string
  is_favorite?: boolean
  report_count: number
  reported_count: number
  badge: boolean
  reason: string
  report_comment: string
}
export type UserNotificationType = {
  id: string
  type: 'user'
  first_name: string
  last_name: string
  plan: string
  report_count: number
  created_at: string
  service_used: number
  badge: boolean
}

export type ExtendedGuideNotificationType = GuideNotificationType & {
  reportedUsers: UserNotificationType[]
}
