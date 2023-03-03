module.exports = {
  root: true,

  plugins: ['react', 'testing-library'],

  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'contactlab/typescript',
    'prettier'
  ],

  env: {
    jest: true
  },

  rules: {
    // --- ES6
    'no-duplicate-imports': 'error',

    // --- React
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': 'off',
    'react/display-name': 'off',

    // --- JSDoc
    'jsdoc/no-multi-asterisks': 'off'
  },

  overrides: [
    // --- Disable typescript rules for tests files and enables testing-library only for them
    {
      files: ['*.spec.ts*', '**/__testing/**/*.ts'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
      },
      extends: ['plugin:testing-library/react']
    }
  ],

  settings: {
    react: {
      version: 'detect'
    },

    'testing-library/custom-renders': 'off'
  }
};
