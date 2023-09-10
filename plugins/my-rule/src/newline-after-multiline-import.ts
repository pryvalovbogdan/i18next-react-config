import { TSESLint } from '@typescript-eslint/utils';

type MessageIds = 'messageIdNoLine';

const newlineAfterMultilineImport: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: 'problem',
    messages: {
      messageIdNoLine: 'No new line after multiline import',
    },
    schema: [],
  },
  create(context: any) {
    return {
      ImportDeclaration(node: any) {
        const isMultilineImport = node.loc.start.line !== node.loc.end.line;

        if (!isMultilineImport) {
          return;
        }

        const sourceCode = context.getSourceCode();
        const nextNodeToken = sourceCode.getTokenAfter(node);

        if (!nextNodeToken) {
          return;
        }

        const nextNodeIndex = sourceCode.getIndexFromLoc(nextNodeToken.loc.start);
        const nextNode = sourceCode.getNodeByRangeIndex(nextNodeIndex);
        const isNextNodeImportDeclaration = nextNode?.type === 'ImportDeclaration';

        if (!isNextNodeImportDeclaration) {
          return;
        }

        const needNewlineAfterImport = node.loc.end.line + 1 === nextNode.loc.start.line;

        if (needNewlineAfterImport) {
          context.report({
            node,
            messageId: 'messageIdNoLine',
            fix(fixer: any) {
              return fixer.insertTextAfter(node, '\n');
            },
          });
        }
      },
    };
  },
};

export default newlineAfterMultilineImport;
