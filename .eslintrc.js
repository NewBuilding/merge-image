module.exports = {
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    // sourceType: 'module',
    project: './tsconfig.json',
  },
  // plugins: ['prettier'],
  extends: [
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
    // 'plugin:vue/vue3-recommended',
    // 'prettier',
    // 'prettier/@typescript-eslint'
  ],
  rules: {
    'import/prefer-default-export': 0,
    'no-unused-vars': [
      'error',
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      { varsIgnorePattern: '.*', args: 'none' }
    ],
    'no-restricted-globals': ['error'],
    // since we target ES2015 for baseline support, we need to forbid object
    // rest spread usage (both assign and destructure)
    'no-restricted-syntax': [
      'error',
      'ObjectExpression > SpreadElement',
      'ObjectPattern > RestElement'
    ]
  }
}
