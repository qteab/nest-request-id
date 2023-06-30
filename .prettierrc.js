/** @type {import('prettier').Config} **/
module.exports = {
  arrowParens: 'avoid',
  printWidth: 80,
  singleQuote: true,
  tabWidth: 2,
  semi: true,
  overrides: [
    {
      files: ['*.mdx'],
      options: {
        proseWrap: 'always',
      },
    },
  ],
};
