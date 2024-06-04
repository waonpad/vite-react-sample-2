module.exports = {
  extends: ["plugin:@typescript-eslint/recommended", "plugin:tailwindcss/recommended", "prettier"],
  plugins: ["unused-imports", "vitest", "import"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    warnOnUnsupportedTypeScriptVersion: false,
  },
  ignorePatterns: [
    "node_modules/",
    "public/",
    "changelog.config.js",
    "commitlint.config.js",
    "lint-staged.config.js",
    "postcss.config.js",
    "stylelint.config.js",
    "tailwind.config.js",
    "**/*.cjs",
    "**/*.mjs",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
    "@typescript-eslint/ban-ts-comment": "off",
    "no-else-return": ["error", { allowElseIf: false }],
    "unused-imports/no-unused-imports-ts": "error",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
        pathGroups: [
          {
            pattern: "{react,react-dom/**,react-router-dom}",
            group: "builtin",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: {
          order: "asc",
        },
      },
    ],
    "vitest/consistent-test-it": ["error", { fn: "it" }],
  },
};
