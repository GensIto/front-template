import { composeStories } from '@storybook/react'
import { render } from '@testing-library/react'

import * as stories from './App.stories'

const { Default, CountUp, Error } = composeStories(stories)

test('初期表示時にカウントが0', async () => {
  const { findByRole } = render(<Default />)

  expect(await findByRole('button', { name: 'count is 0' })).toBeVisible()
})

test('カウントアップが押されるとカウントアップできている', async () => {
  const { container, getByRole } = render(<CountUp />)
  await CountUp.play({
    canvasElement: container,
  })

  await expect(getByRole('button', { name: 'count is 1' })).toBeVisible()
})

test('カウントアップが押されるとカウントアップできている', async () => {
  const { getByText } = render(<Error />)

  expect(getByText('failed to load')).toBeVisible()
})
