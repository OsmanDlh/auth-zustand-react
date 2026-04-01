import js from '@eslint/js'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      'simple-import-sort': simpleImportSort,
      'no-relative-import-paths': noRelativeImportPaths,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // No console.log
      'no-console': 'error',

      // No function declarations for components — use const arrow functions
      'func-style': ['error', 'expression'],

      // Import sorting
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // No relative imports — force @/ alias
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        { allowSameFolder: false, rootDir: 'src', prefix: '@' },
      ],

      // Max lines per file (350)
      'max-lines': ['error', { max: 350, skipBlankLines: true, skipComments: true }],

      // Exports at end of file — no inline export on declarations
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportNamedDeclaration[declaration]',
          message:
            'No inline exports. Declare first, then export at the end of the file using export { ... } or export type { ... }.',
        },
        {
          selector: 'ExportDefaultDeclaration[declaration.type="FunctionDeclaration"]',
          message:
            'No inline default export of function declarations. Declare first, then export default at the end.',
        },
      ],
    },
  },
])
