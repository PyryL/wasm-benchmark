
/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  overrides: [
    {
      files: ['backend/**/*.js'],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        node: true,
        commonjs: true,
      },
    },
  ],
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
    'coverage',
    'node_modules',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', '@stylistic/js'],
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
    '@stylistic/js/max-len': ['error', { code: 100 }],
    '@stylistic/js/arrow-spacing': ['error', { before: true, after: true }],
    '@stylistic/js/comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],
    '@stylistic/js/eol-last': 'error',
    '@stylistic/js/indent': ['error', 2],
    '@stylistic/js/no-multi-spaces': 'error',
    '@stylistic/js/no-trailing-spaces': 'error',
    '@stylistic/js/quotes': ['error', 'single'],
  },
}
