'use client'
import { Box, Button, Group, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import React from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function SearchReport() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [checked, setChecked] = useState(false)

  const updateQueryParams = useDebouncedCallback((term: string, favorites: boolean) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
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

  return (
    <>
      <Box maw={352} mx="auto" bg="secondary">
        <Group justify="space-between" align="center">
          <IconSearch size={24} />
          <TextInput
            w="50%"
            placeholder="フリーワード"
            onChange={(event) => handleSearchChange(event.currentTarget.value)}
            defaultValue={searchParams.get('query')?.toString() || ''}
          />
          <Button mb={0} size="sm" component={Link} href="/reoprt">
            凍結一覧
          </Button>
        </Group>
      </Box>
    </>
  )
}
