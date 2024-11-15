/* eslint-disable no-underscore-dangle */
import globals from "globals";
import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: { ecmaVersion: "latest" },
    },
  },
  ...compat.extends("airbnb-base"),
  {
    rules: {
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: ["**/*.test.js", "eslint.config.mjs"],
        },
      ],
    },
  },
  eslintConfigPrettier,
];
