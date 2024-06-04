export default {
  "**/*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
  "**/*.{css,scss}": ["stylelint --fix"],
};
