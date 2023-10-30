'use client'

import { DropdownMenu, Button } from '@radix-ui/themes'
import { AiOutlineDown } from 'react-icons/ai'
import React from 'react'


const IssueStatusFilter = () => {
  return (
    <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <Button variant="solid">
        Options
        <AiOutlineDown width="12" height="12" />
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content variant="solid">
      <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
      <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
  )
}

export default IssueStatusFilter