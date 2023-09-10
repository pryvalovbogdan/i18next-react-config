import { TSESLint } from '@typescript-eslint/utils';

type MessageIds = 'messageIdNoLine';

const newlineBeforeImport: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: 'problem',
    fixable: 'code',
    messages: {
      messageIdNoLine: 'No new line before multiline import',
    },
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const sourceCode = context.getSourceCode();
        const prevNodeToken = sourceCode.getTokenBefore(node);

        if (!prevNodeToken) {
          return;
        }

        const prevNodeIndex = sourceCode.getIndexFromLoc(prevNodeToken.loc.start);
        const prevNode = sourceCode.getNodeByRangeIndex(prevNodeIndex);
        const isPrevNodeImportDeclaration = prevNode?.type === 'ImportDeclaration';

        if (!isPrevNodeImportDeclaration) {
          return;
        }

        const needNewlineBeforeImport = node.loc.start.line - 1 === prevNode.loc.end.line;

        if (needNewlineBeforeImport) {
          context.report({
            node,
            messageId: 'messageIdNoLine',
            fix(fixer: any) {
              return fixer.insertTextBefore(node, '\n');
            },
          });
        }
      },
    };
  },
};

export default newlineBeforeImport;
