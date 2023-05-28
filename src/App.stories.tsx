import { StoryObj, Meta } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { rest } from 'msw'

import { decorators, parameters } from '../.storybook/preview'

import App from './App'

export default {
  component: App,
  parameters,
  decorators,
} as Meta<typeof App>

type Story = StoryObj<typeof App>

export const Default: Story = {
  name: '初期表示',
}

export const CountUp: Story = {
  name: 'カウントアップ',
  play: async ({ canvasElement }) => {
    const ui = within(canvasElement)
    await waitFor(() => userEvent.click(ui.getByRole('button', { name: 'count is 0' })))
  },
}

export const Error: Story = {
  name: 'エラー',
  parameters: {
    msw: {
      handlers: [
        rest.get(
          'https://jsonplaceholder.typicode.com/todos',
          async (_request, response, context) => response(context.status(400), context.json({}))
        ),
      ],
    },
  },
}
