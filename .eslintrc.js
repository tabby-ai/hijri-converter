module.exports = {
  ignorePatterns: [
    'src',
    'babel.config.js',
    'jest.config.js',
    '.prettierrc.js',
    '.eslintrc.js',
    'dist'
  ],
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['unicorn'],
  rules: {
    'unicorn/no-useless-switch-case': 'error',
    'unicorn/prefer-ternary': 'error',
    'unicorn/prefer-logical-operator-over-ternary': 'error',
  },
};
