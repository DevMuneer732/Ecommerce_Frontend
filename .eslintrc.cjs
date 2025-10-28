module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react', 'react-hooks', 'jsx-a11y', 'prettier'],
  rules: {
    // This is the rule causing the issue for exported components without explicit types.
    "@typescript-eslint/explicit-module-boundary-types": "off", 
    
    // You might also need this if using a plain function/arrow function:
    "@typescript-eslint/explicit-function-return-type": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
      
    ],
    'prettier/prettier': 'error',
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off"
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
}