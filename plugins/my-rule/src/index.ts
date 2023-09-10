import { TSESLint } from '@typescript-eslint/utils';
// import myRule from './myRule';
import newlineBeforeImport from './newline-before-multiline-import';
import newlineAfterMultilineImport from './newline-after-multiline-import';

export const rules = {
  // 'my-rule': myRule,
  'new-line-before': newlineBeforeImport,
  'new-line-after': newlineAfterMultilineImport,
} satisfies Record<string, TSESLint.RuleModule<string, Array<unknown>>>;
