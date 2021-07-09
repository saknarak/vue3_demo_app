module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'standard',
  ],
  plugins: [
    'vue',
  ],
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'comma-dangle': [2, 'always-multiline'],
    'space-before-function-paren': 0,
    'object-curly-spacing': 0,
    'prefer-const': 0,
    'no-unneeded-ternary': ['error', { defaultAssignment: true }],
    'vue/max-attributes-per-line': 0,
    'vue/attributes-order': 0,
    'vue/require-default-prop': 0,
    'no-control-regex': 0,
  },
  globals: {
    // '$': true,
  },
}
