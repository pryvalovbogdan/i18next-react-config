import { TSESLint, TSESTree } from '@typescript-eslint/utils';

// Define custom message identifiers for ESLint messages
type MessageIds = 'messageIdNoLine';

// Define the ESLint rule and its properties
const groupUpImportsByType: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [], // Default options for the rule (none in this case)
  meta: {
    type: 'problem', // The type of ESLint rule (problem, suggestion, etc.)
    fixable: 'code', // Indicates that this rule can automatically fix code issues
    messages: {
      messageIdNoLine: 'No new line before multiline import', // Custom error message
    },
    schema: [], // Configuration schema for this rule (none in this case)
  },
  create(context: TSESLint.RuleContext<MessageIds, []>) {
    let lastGroupType: string = ''; // Initialize a variable to track the last import group

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        const importPath = node.source.value; // Get the path of the import statement

        let currentGroupType = ''; // Initialize a variable to track the current import group type

        // Determine the import group type based on the import path
        if (importPath.startsWith('.')) {
          currentGroupType = 'local folder files';
        } else if (importPath.startsWith('@')) {
          currentGroupType = 'internal modules';
        } else {
          currentGroupType = 'external modules';
        }

        const sourceCode = context.getSourceCode();
        const prevNodeToken = sourceCode.getTokenBefore(node); // Get the token before the current import statement

        // Check if there is a token before the current import statement
        if (!prevNodeToken) {
          return; // If there is no token before, exit the function
        }

        // Calculate the index of the previous token's location in the source code
        const prevNodeIndex = sourceCode.getIndexFromLoc(prevNodeToken.loc.start);

        // Get the node (AST node) corresponding to the previous token's location
        const prevNode = sourceCode.getNodeByRangeIndex(prevNodeIndex);

        // Check if the previous node is an 'ImportDeclaration' node
        const isPrevNodeImportType = prevNode?.type === 'ImportDeclaration';

        // If the previous node is not an 'ImportDeclaration', like 'Punctuator', etc..., exit the function
        if (!isPrevNodeImportType) {
          return;
        }

        // Calculate whether a newline is needed before the current import statement
        const isNewlineNeeded = node.loc.start.line - 1 === prevNode.loc.end.line;

        // Check if a new line is needed before the import statement and report an error if necessary
        if (lastGroupType !== '' && lastGroupType !== currentGroupType) {
          if (isNewlineNeeded) {
            context.report({
              node, // The AST node that triggered the error
              messageId: 'messageIdNoLine', // The custom message identifier ('messageIdNoLine' in this case)
              fix(fixer: TSESLint.RuleFixer) {
                // A function to provide a fix for the reported error
                return fixer.insertTextBefore(node, '\n'); // The fixer inserts a newline before the 'node'
              },
            });
          }
        }
        lastGroupType = currentGroupType; // Update the last import group type
      },
    };
  },
};

export default groupUpImportsByType;
