import { TSESLint, TSESTree } from '@typescript-eslint/utils';

// Define custom message identifiers for ESLint messages
type MessageIds = 'messageIdNoLine';
const groupUpImportsByType = {
  defaultOptions: [], // Default options for the rule (none in this case)
  meta: {
    type: "problem", // The type of ESLint rule (problem, suggestion, etc.)
    fixable: "code", // Indicates that this rule can automatically fix code issues
    messages: {
      messageIdNoLine: "No new line before multiline import" // Custom error message
    },
    schema: [] // Configuration schema for this rule (none in this case)
  },
  create(context: TSESLint.RuleContext<MessageIds, []>) {
    let lastGroupType: string | null = null; // Initialize a variable to track the last import group

    return {
      Program: {
        exit() {
          lastGroupType = null; // Reset the last import group type at the end of the program
        }
      },
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        const importPath = node.source.value; // Get the path of the import statement

        let currentGroupType = ""; // Initialize a variable to track the current import group type

        // Determine the import group type based on the import path
        if (importPath.startsWith(".")) {
          currentGroupType = "local folder files";
        } else if (importPath.startsWith("@")) {
          currentGroupType = "internal modules";
        } else {
          currentGroupType = "external modules";
        }

        // Check if a new group is encountered
        if (lastGroupType && lastGroupType !== currentGroupType) {
          context.report({
            node, // The AST node of the current import statement
            messageId: "messageIdNoLine", // The custom message identifier ('messageIdNoLine' in this case)
            fix(fixer: TSESLint.RuleFixer) {
              // A function to provide a fix for the reported error
              return fixer.insertTextBefore(node, "\n"); // Insert an empty line before the current import statement
            }
          });
        }

        lastGroupType = currentGroupType; // Update the last import group type
      }
    };
  }
};

export default groupUpImportsByType;
