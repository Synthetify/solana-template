module.exports = {
  extends: ['standard-with-typescript'],
  parserOptions: {
    project: './tsconfig.json'
  },
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    'prettier/prettier': ['error']
  }
}
