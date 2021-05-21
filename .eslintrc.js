module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    // "jquery": true
    jest: true,
    'jsx-control-statements/jsx-control-statements': true, // 能够在jsx中使用if，需要配合另外的babel插件使用
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  global: {
    Recordable: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-control-statements/recommended', // 需要另外配合babel插件使用
  ],
  settings: {
    react: {
      version: 'detect', // 自动读取已安装的react版本
    },
  },
  plugins: ['@typescript-eslint', 'react', 'jsx-control-statements'],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'space-before-function-paren': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
  },
};
