module.exports = {
  extends: ["stylelint-config-standard-scss", "stylelint-config-recess-order"],
  rules: {
    // https://designsupply-web.com/media/programming/7642/
    "at-rule-no-unknown": [true, { ignoreAtRules: ["tailwind"] }],
    "scss/at-rule-no-unknown": [true, { ignoreAtRules: ["tailwind"] }],
  },
};
