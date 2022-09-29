module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'standard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // enable additional rules
    'linebreak-style': ['error', 'unix'],
    indent: ['error', 2],
    semi: ['error', 'always'],
    eqeqeq: [2, 'smart'],
    // override configuration set by extending "eslint:recommended"
    'no-empty': 'warn',
    'no-cond-assign': ['error', 'always'],
    'no-unused-expressions': [2, { allowShortCircuit: true }],
    'no-restricted-globals': ['error', 'fdescribe'],
    'space-before-function-paren': ['error', {
      anonymous: 'ignore',
      named: 'never',
      asyncArrow: 'always',
    }],
    'comma-dangle': ['error', 'always-multiline'],

    // disable rules from base configurations
    'for-direction': 'off',
    'max-len': [
      'error', 150, 2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
  },
};
