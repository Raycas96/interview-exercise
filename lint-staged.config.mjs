/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
const config = {
  "*.{js,jsx,ts,tsx,mjs,cjs}": ["prettier --write --ignore-unknown"],
  "*.{json,md,yml,yaml,css,scss,html}": ["prettier --write --ignore-unknown"],
};

export default config;
