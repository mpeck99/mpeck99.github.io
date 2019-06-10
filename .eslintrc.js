module.exports = {
  env: {
    browser: true,
    es6: true
  },
  globals: {
    require: 1,
    jQuery: 1
  },
  extends: 'eslint:recommended',
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};
