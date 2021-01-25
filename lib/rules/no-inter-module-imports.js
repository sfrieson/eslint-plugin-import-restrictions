const path = require('path');

const doesModuleIncludeFile = (module, file) => module.includesFile(file);
const resolveRelativeFile = (contextFile, importSource) =>
  path.join(path.dirname(contextFile), importSource);

const typeString = () => ({ type: 'string' });
const typeObject = (properties) => ({ type: 'object', properties });
const anyOf = (...types) => ({ anyOf: types });
const arrayOf = (itemType) => ({ type: 'array', items: itemType });

const typeModule = () =>
  anyOf(
    typeString(),
    typeObject({
      moduleRoot: typeString(),
      public: arrayOf(typeString()),
      private: arrayOf(typeString()),
    })
    // typeObject({
    //   pattern: typeString(),
    //   public: arrayOf(typeString()),
    //   private: arrayOf(typeString()),
    // })
  );

const schema = arrayOf(anyOf(typeModule(), arrayOf(typeModule())));

const makeModule = (config) => {
  let module = {};
  if (typeof config === 'string') {
    module.moduleRoot = config;
  } else {
    module = Object.assign({}, config);
  }

  module.includesFile = (file) => file.startsWith(module.moduleRoot);

  return module;
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disables the use of relative parent/ancestor imports.',
    },
    schema,
    messages: {
      'no-inter-module-imports':
        "Don't import from other modules. " +
        'Consider moving the desired export to a common area.\n' +
        'Import: {{ importFile }}',
    },
  },
  create(context) {
    let moduleConfigGroups = context.options;

    if (!Array.isArray(moduleConfigGroups[0])) {
      moduleConfigGroups = [moduleConfigGroups];
    }

    moduleConfigGroups = moduleConfigGroups.map((configGroup) =>
      configGroup.map(makeModule)
    );

    return {
      ImportDeclaration(node) {
        for (let i = 0; i < moduleConfigGroups.length; i++) {
          const moduleGroup = moduleConfigGroups[i];
          const currentFile = context.getFilename();
          const module = moduleGroup.find((module) =>
            doesModuleIncludeFile(module, currentFile)
          );

          if (!module) {
            continue;
          }

          let importFile = node.source.value;
          if (importFile.startsWith('.')) {
            importFile = resolveRelativeFile(currentFile, importFile);
          }
          const isImportContainedWithinModule = doesModuleIncludeFile(
            module,
            importFile
          );

          if (isImportContainedWithinModule) {
            continue;
          }

          // The import could be to another module or to a non-module directory.
          const isImportToAnotherModule = !!moduleGroup.find((module) =>
            doesModuleIncludeFile(module, importFile)
          );
          if (!isImportToAnotherModule) {
            continue;
          }

          context.report({
            node,
            messageId: 'no-inter-module-imports',
            data: {
              importFile,
            },
          });

          break;
        }
      },
    };
  },
};
