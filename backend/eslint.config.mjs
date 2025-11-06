import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  {
    ignores: ['dist/**'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: '/backend',
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  eslintPluginPrettierRecommended,
]);
