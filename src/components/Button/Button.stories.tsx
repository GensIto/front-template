import { StoryObj, Meta } from '@storybook/react'

import { Button } from '.'

export default {
  component: Button,
} as Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'ボタン',
  },
}

export const Disabled: Story = {
  args: {
    children: 'ボタン',
    disabled: true,
  },
}
