module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
    amd: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    '@react-native',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'react-hooks', 'prettier'],
  rules: {
    // 'react/jsx-indent': [2, 2],
    indent: [2, 2, {SwitchCase: 1}],
    'no-tabs': ['error', {allowIndentationTabs: true}],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    // "react/prop-types": "off",
  },
};
