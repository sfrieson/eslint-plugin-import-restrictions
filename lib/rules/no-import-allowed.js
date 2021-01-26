const path = require('path');

const doesModuleIncludeFile = (module, file) => file.startsWith(module);
const resolveRelativeFile = (contextFile, importSource) =>
  path.join(path.dirname(contextFile), importSource);

const typeString = () => ({ type: 'string' });
const arrayOf = (itemType) => ({ type: 'array', items: itemType });

const schema = arrayOf(typeString());

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disables the use of relative parent/ancestor imports.',
    },
    schema,
    messages: {
      'no-import-allowed':
        "Don't import this module.\n" + 'Import: {{ importFile }}',
    },
  },
  create(context) {
    const restrictedImports = context.options;

    return {
      ImportDeclaration(node) {
        let importFile = node.source.value;

        if (importFile.startsWith('.')) {
          const currentFile = context.getFilename();
          importFile = resolveRelativeFile(currentFile, importFile);
        }

        const restrictedContainingImport = restrictedImports.find(
          (restricted) => doesModuleIncludeFile(restricted, importFile)
        );

        if (!restrictedContainingImport) {
          return;
        }

        context.report({
          node,
          messageId: 'no-import-allowed',
          data: {
            importFile,
          },
        });
      },
    };
  },
};
