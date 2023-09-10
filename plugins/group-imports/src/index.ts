import { TSESLint } from '@typescript-eslint/utils';

import groupUpImportsByType from './group-up-imports-by-type';

export const rules = {
  'new-line-import-group': groupUpImportsByType,
} satisfies Record<string, TSESLint.RuleModule<string, Array<unknown>>>;
