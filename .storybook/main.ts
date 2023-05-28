import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    config.resolve!.alias = {
      ...config.resolve!.alias,
      '@': path.resolve(__dirname, '../src'),
    }
    return config
  },
}
export default config
