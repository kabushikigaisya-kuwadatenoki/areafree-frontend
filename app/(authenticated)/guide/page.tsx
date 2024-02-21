import { DetailFilter } from '@/app/(authenticated)/_components/guide/detail-filter'
import { GuideTabs } from '@/app/(authenticated)/_components/guide/tabs'
import { SearchForm } from '@/app/_components/ui/common/search-form'
import { Checkbox, Rating, Select, Text } from '@mantine/core'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      <GuideTabs />
      <SearchForm />
      <DetailFilter />
    </>
  )
}
