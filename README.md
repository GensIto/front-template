## 初期設定

- [x] eslint
- [x] prettier
- [ ] storybook
- [ ] storybook: test
  - [ ] jest
- [ ] storybook: msw
- [x] e2e
- [ ] UI library
- [ ] tanstack query
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
