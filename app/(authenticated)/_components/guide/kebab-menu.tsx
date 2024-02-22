'use client'
import { ActionIcon, Group, Menu } from '@mantine/core'
import { IconBell, IconDotsVertical, IconPhone } from '@tabler/icons-react'
import Link from 'next/link'

export default function KebabMenu() {
  return (
    <Group
      justify="center"
      style={{ borderTop: '1px solid #E0E0E0', position: 'relative' }}
      w="100%"
      mt={16}
      pt={8}
      maw={300}
    >
      <Group gap={30}>
        <ActionIcon variant="default" style={{ border: 'unset' }}>
          <IconPhone stroke={1} />
        </ActionIcon>
        <ActionIcon variant="default" style={{ border: 'unset' }}>
          <IconBell stroke={1} />
        </ActionIcon>
      </Group>
      <Menu>
        <Menu.Target>
          <ActionIcon
            variant="default"
            radius="unset"
            color="grey"
            style={{ border: 'unset', position: 'absolute', right: 0 }}
            ml="auto"
          >
            <IconDotsVertical stroke={1} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>ブロック</Menu.Item>
          <Menu.Item color="red" fw={700}>
            通報
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}
