'use client'
import { Box, Checkbox, Group, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function SearchForm() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [checked, setChecked] = useState(false)

  const updateQueryParams = useDebouncedCallback((term: string, favorites: boolean) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set('nickname', term)
    } else {
      params.delete('nickname')
    }

    if (favorites) {
      params.set('favorites', 'true')
    } else {
      params.delete('favorites')
    }

    replace(`${pathname}?${params.toString()}`)
  }, 300)

  const handleSearchChange = (term: string) => {
    updateQueryParams(term, checked)
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.currentTarget.checked)
    updateQueryParams(searchParams.get('nickname') || '', event.currentTarget.checked)
  }

  return (
    <>
      <Box maw={352} mx="auto">
        <Group justify="space-between">
          <IconSearch size={24} />
          <TextInput
            w="85%"
            placeholder="フリーワード"
            onChange={(event) => handleSearchChange(event.currentTarget.value)}
            defaultValue={searchParams.get('query')?.toString() || ''}
            mb="sm"
          />
        </Group>
        <Checkbox
          label="お気に入り登録済みガイドのみを表示"
          checked={checked}
          onChange={handleCheckboxChange}
          size="xs"
        />
      </Box>
    </>
  )
}
