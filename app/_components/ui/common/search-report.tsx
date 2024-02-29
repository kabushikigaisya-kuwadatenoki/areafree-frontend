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
      <Box mx="auto" bg="#CDE8E2" py={5} px={10}>
        <Group justify="space-between" align="center">
          <Group align="center" gap={5}>
            <IconSearch size={24} />
            <TextInput
              w="80%"
              placeholder="フリーワード"
              onChange={(event) => handleSearchChange(event.currentTarget.value)}
              defaultValue={searchParams.get('query')?.toString() || ''}
            />
          </Group>
          <Button mb={0} size="sm" component={Link} href="/reoprt">
            凍結一覧
          </Button>
        </Group>
      </Box>
    </>
  )
}
