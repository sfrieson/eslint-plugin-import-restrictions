/*

TODO
- Support arbitrary number of ancestor levels
- Support ancestor imports within a defined relative module/scope
- Support different config per directory

*/
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disables the use of relative parent/ancestor imports.',
    },
    messages: {
      'no-parent-imports':
        "Don't import files from parent/ancestor directories.",
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const importSource = node.source.value;
        if (importSource.startsWith('..')) {
          context.report({
            node,
            messageId: 'no-parent-imports',
          });
        }
      },
    };
  },
};
