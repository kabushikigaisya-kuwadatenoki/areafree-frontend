'use client'
import { Group, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export function SearchBar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <Group justify="center">
      <IconSearch size={24} />
      <TextInput
        placeholder="フリーワード"
        onChange={(event) => handleSearch(event.currentTarget.value)}
        defaultValue={searchParams.get('query') || ''}
      />
    </Group>
  )
}
