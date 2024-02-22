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
    status ? params.set('status', status) : params.delete('status')
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
                data={['男性', '女性', 'その他']}
                value={gender}
                onChange={(value) => {
                  setGender(value || '')
                  updateFilters()
                }}
              />
              <Select
                label="対応状況"
                placeholder="すべて"
                data={['対応可能', '対応不可']}
                value={status}
                onChange={(value) => {
                  setStatus(value || '')
                  updateFilters()
                }}
              />
              <Select
                label="評価"
                placeholder="すべて"
                data={['高評価', '中評価', '低評価']}
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
