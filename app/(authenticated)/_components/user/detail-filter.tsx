'use client'
import { Accordion, Paper, Select, Stack } from '@mantine/core'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export function DetailFilter() {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const [gender, setGender] = useState('')
  const [status, setStatus] = useState('')
  const [evaluation, setEvaluation] = useState('')

  const updateFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams)

    gender ? params.set('gender', gender) : params.delete('gender')
    status ? params.set('support_status', status) : params.delete('support_status')
    evaluation ? params.set('evaluation', evaluation) : params.delete('evaluation')

    replace(`${pathname}?${params.toString()}`)
  }, [gender, status, evaluation, searchParams, replace, pathname])

  useEffect(() => {
    updateFilters()
  }, [updateFilters])

  return (
    <Paper maw={352} mx="auto" my="1em">
      <Accordion>
        <Accordion.Item value="detail">
          <Accordion.Control style={{ fontSize: 14, background: '#CDE8E2' }}>
            詳細条件を追加
          </Accordion.Control>
          <Accordion.Panel p={0} style={{ background: '#CDE8E2' }}>
            <Stack bg="#ffffff" p="md" mt="sm" style={{ borderRadius: '16px' }}>
              <Select
                label="性別"
                placeholder="すべて"
                data={[{ value: '', label: 'すべて' }, { value: '男性', label: '男性' }, { value: '女性', label: '女性' }]}
                value={gender}
                onChange={(value) => {
                  setGender(value || '')
                  updateFilters()
                }}
              />
              <Select
                label="対応状況"
                placeholder="すべて"
                data={[
                  { value: '', label: 'すべて' },
                  { value: 'available', label: '対応可能' },
                  { value: 'unavailable', label: '対応不可' },
                ]}
                value={status}
                onChange={(value) => {
                  setStatus(value || '')
                  updateFilters()
                }}
              />
              <Select
                label="評価"
                placeholder="すべて"
                data={[
                  { value: '', label: 'すべて' },
                  { value: '5', label: '★5' },
                  { value: '4', label: '★4以上' },
                  { value: '3', label: '★3以上' },
                ]}
                value={evaluation}
                onChange={(value) => {
                  setEvaluation(value || '')
                  updateFilters()
                }}
              />
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Paper>
  )
}
