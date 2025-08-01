module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    // TypeScript 관련
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    
    // 일반 규칙
    'no-console': 'off', // 데모와 로깅을 위해 허용
    'no-debugger': 'error',
    'no-unused-vars': 'off', // TypeScript 규칙 사용
    
    // 코드 스타일
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    
    // 타로 앱 특화 규칙
    'max-len': ['warn', { code: 120 }],
    'no-magic-numbers': 'off', // 타로 카드 ID와 숫자가 많음
    'camelcase': ['error', { properties: 'never' }]
  },
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '*.js',
    '*.d.ts'
  ],
};