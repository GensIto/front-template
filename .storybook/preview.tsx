import type { Preview } from '@storybook/react'
import { rest } from 'msw'
import { Story } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { initialize, mswDecorator } from 'msw-storybook-addon'

export const decorators = [
  mswDecorator,
  (Element: Story) => {
    const queryClient = new QueryClient()
    return (
      <QueryClientProvider client={queryClient}>
        <Element />
      </QueryClientProvider>
    )
  },
]

initialize()

export const parameters: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw: {
      handlers: [
        rest.get(
          'https://jsonplaceholder.typicode.com/todos',
          async (_request, response, context) => {
            return response(
              context.status(200),
              context.json([{ userId: 1, id: 1, title: 'storybook msw', completed: false }])
            )
          }
        ),
      ],
    },
  },
}
