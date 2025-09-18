module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // 基础规则
    'no-console': 'warn',
    'no-unused-vars': 'error',
    
    // 命名规则
    'camelcase': 'error',
    
    // 代码质量规则
    'no-var': 'error',
    'prefer-const': 'error',
    'no-duplicate-imports': 'error',
    'no-undef': 'error',
  },
}; 