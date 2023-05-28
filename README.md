## 初期設定

- [x] eslint
- [x] prettier
- [x] storybook
- [x] storybook: test
  - [x] jest
- [x] storybook: msw
- [ ] VRT
- [x] e2e
- [x] UI library
- [x] tanstack query
- [ ] react-hook-from
- [ ] react-router-dom

<details>
<summary>eslint</summary>

[参考](https://tech-broccoli.life/articles/engineer/create-react-with-vite#node%E7%92%B0%E5%A2%83%E3%81%AE%E8%A8%AD%E5%AE%9A)

```
yarn add -D eslint
npm init @eslint/config


✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · standard-with-typescript
✔ What format do you want your config file to be in? · JavaScript
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · yarn

```

airbnb 導入

```
yarn add -D eslint-config-airbnb eslint-plugin-react-hooks eslint-plugin-jsx-a11y
yarn add -D eslint-config-airbnb-typescript @typescript-eslint/parser
yarn add -D eslint-config-prettier
yarn add -D eslint-plugin-unicorn

// 使わなくなったやつ
yarn remove eslint-config-standard-with-typescript
```

script 変更

```
"scripts": {
    // ...
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx", // <- 追加
  },
```

自動 import 整列 削除
[参考](https://note.com/show_kanamaru/n/n59ee8c96dc30)

```
yarn add -D eslint-plugin-import eslint-plugin-unused-imports
```

plugins に'import', 'unused-imports'を追加
rules に'import/order'と'@typescript-eslint/no-unused-vars'と'unused-imports/no-unused-imports'を追加

```
  plugins: ['react', 'import', 'unused-imports'],
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          {
            pattern: 'react**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@material-ui/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
```

</details>

<details>
<summary>prettier</summary>
[参考](https://tech-broccoli.life/articles/engineer/create-react-with-vite#node%E7%92%B0%E5%A2%83%E3%81%AE%E8%A8%AD%E5%AE%9A)

```
yarn add -D prettier
```

.prettierrc 作成

```
{
  "semi": false,
  "singleQuote": true,
  "bracketSameLine": true,
  "printWidth": 100
}
```

script に追加

```
"scripts": {
    /// ...
    "format": "npx prettier --write ."
  },
```

</details>

<details>
<summary>playwright</summary>

```
yarn create playwright
```

</details>

<details>
<summary>fetch系</summary>

```
yarn add @tanstack/react-query axios
```

main.ts 更新

```
import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'

import App from './App'

import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)

```

hooks 作成

```
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetUsers = () => {
  const { data, isLoading, isError, error } = useQuery('users', () =>
    axios.get('https://jsonplaceholder.typicode.com/users')
  )

  return { data, isLoading, isError, error }
}
```

または src/hooks/useExample.ts 参考に

</details>

<details>
<summary>MUI</summary>

```
 yarn add @mui/system @emotion/react @emotion/styled

 yarn add @mui/material @mui/styled-engine-sc styled-components @mui/icons-material
```

</details>

<details>
<summary>test(jest)</summary>

```
 yarn add -D jest ts-jest @types/jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

jest.config.js 作成

```
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
}

```

</details>

<details>
<summary>storybook</summary>

vite では package.json の typescript が`"typescript": "*",`になっているため

```
yarn add -D typescript
```

を実行する

```
npx storybook init --builder @storybook/builder-vite
```

main.ts を変更

```
import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
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

```

## msw

```
yarn add -D msw msw-storybook-addon
npx msw init ./public
```

preview.tsx に追加

```
import React from 'react'
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

const preview: Preview = {
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
        rest.get('https://jsonplaceholder.typicode.com/todos', async (_req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([{ userId: 1, id: 1, title: 'storybook msw', completed: false }])
          )
        }),
      ],
    },
  },
}

export default preview

```

a11y

```
yarn add -D @storybook/addon-a11y
```

main に`'@storybook/addon-a11y'`追加

</details>
