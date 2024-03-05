'use client'
import { Accordion, Group, Paper, Text, Title } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'

export default function Page() {
  const faq = [
    {
      question: 'ふぁふぁふぁふぁっふぁふぁふ',
      answer:
        'ふぁふぁふぁふぁふぁふぁっふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁっふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁっふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁっふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁっふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁふぁっふぁふぁふぁふぁふぁふぁふぁ',
    },
    {
      question: '質問2',
      answer: '回答2',
    },
  ]
  const items = faq.map((item) => (
    <Paper p="md" shadow="md" maw={290} mx="auto" my={10} key={item.question}>
      <Accordion.Item key={item.question} value={item.question}>
        <Accordion.Control chevron={<IconChevronDown color="#33947D" />}>
          <Group justify="flex-start" gap={10} align="center">
            <Text size="xs">Q.</Text>
            <Text size="10px" maw={170}>
              {item.question}
            </Text>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <Group justify="flex-start" gap={10}>
            <Text size="xs">A.</Text>
            <Text size="10px">{item.answer}</Text>
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
    </Paper>
  ))
  return (
    <>
      <Title size="sm" fw={700} ta="center" my="md">
        FQA
      </Title>
      <Accordion>{items}</Accordion>
    </>
  )
}
