
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'rust-lib',
    'public/modules',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    'array-callback-return': 'error',
    'no-duplicate-imports': 'error',
    'camelcase': ['error', { ignoreImports: true }],
    'dot-notation': 'error',
    'eqeqeq': ['error', 'always'],
    'max-lines': ['error', { max: 300, skipBlankLines: true }],
    'max-params': ['error', 6],
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    'no-else-return': 'error',
    'no-eval': 'error',
    'no-lonely-if': 'error',
    'no-var': 'error',
    'prefer-const': ['error', { destructuring: 'all' }],
    'require-await': 'error',
  },
}
