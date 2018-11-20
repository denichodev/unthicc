const path = require('path');
const appRootDir = require('app-root-dir');

module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
    },
  },
  plugins: ['import', 'prettier', 'react'],
  env: {
    amd: true,
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json'],
      },
    },
    'import/ignore': '.(scss|less|css|png|jpg|jpeg|bmp|gif|svg)$',
    'import/extensions': ['.js', '.jsx'],
  },
  rules: {
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'class-methods-use-this': 'off',
    'global-require': 'off',
    'max-len': [
      'error',
      120,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', argsIgnorePattern: '^_', ignoreRestSiblings: true }],
    'no-unused-expressions': ['error', { allowTaggedTemplates: true }],
    'object-curly-newline': 'off',
    'newline-after-var': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var', 'if'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: '*', next: ['if', 'return'] },
    ],
    'prettier/prettier': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/forbid-prop-types': ['warn', { forbid: ['any', 'array'] }],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'react/no-array-index-key': 'off',
    'react/no-danger': 'off',
    'semi': 'error',
    'react/sort-prop-types': [
      'warn',
      {
        callbacksLast: false,
        ignoreCase: true,
        requiredFirst: false,
        sortShapeProp: true,
      },
    ],
  },
  globals: {},
};
