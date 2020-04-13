module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    indent: ['warn', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: [2, 'never'],
    'no-console': 1,
    'comma-dangle': [0],
    'arrow-parens': [0],
    'object-curly-spacing': ['warn', 'always'],
    'array-bracket-spacing': ['warn', 'always'],
    'import/prefer-default-export': [0]
  }
}
