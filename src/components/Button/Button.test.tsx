import { composeStories } from '@storybook/react'
import { userEvent } from '@storybook/testing-library'
import { act, render } from '@testing-library/react'

import * as stories from './Button.stories'

const { Default, Disabled } = composeStories(stories)

test('disabledを渡さなければ活性化されている', async () => {
  const onClick = jest.fn()
  const { getByRole } = render(<Default onClick={onClick} />)

  expect(getByRole('button', { name: 'ボタン' })).toBeEnabled()

  act(() => userEvent.click(getByRole('button', { name: 'ボタン' })))
  expect(onClick).toHaveBeenCalled()
})

test('disabledを渡すと非活性されている', async () => {
  const onClick = jest.fn()
  const { getByRole } = render(<Disabled onClick={onClick} />)

  expect(getByRole('button', { name: 'ボタン' })).toBeDisabled()
})
