// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
import eslintConfigPrettier from "eslint-config-prettier";

module.exports = defineConfig([
  expoConfig,
  eslintConfigPrettier,
  {
    ignores: ['dist/*'],
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
]);
