module.exports = {
  meta: {
    messages: {
      avoidName: "Avoid using variables named '{{ name }}'",
    },
    type: 'problem',
    fixable: true,
  },
  create(context) {
    return {
      Identifier(node) {
        if (node.name === 'deprecatedMethod') {
          context.report({
            node,
            messageId: 'avoidName',
            data: {
              name: 'deprecatedMethod',
            },
            fix(fixer) {
              return [fixer.replaceTextRange([node.start, node.end], 'newMethod')];
            },
          });
        }
      },
    };
  },
};
