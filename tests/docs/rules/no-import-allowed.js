var rule = require('../../../lib/rules/no-import-allowed');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester({
  parserOptions: { sourceType: 'module', ecmaVersion: 2015 },
});
ruleTester.run('no-import-allowed docs examples', rule, {
  valid: [],
  invalid: [
    {
      filename: 'src/module/NewFoo/index.js',
      options: ['src/legacy/Foo'],
      code: "import Foo from 'src/legacy/Foo';",
      errors: [
        {
          messageId: 'no-import-allowed',
          data: {
            importFile: 'src/legacy/Foo',
          },
        },
      ],
    },
    {
      options: ['src/legacy/Foo'],
      filename: 'src/components/Foo/index.js',
      code: "import Bar from 'src/legacy/Foo';",
      errors: [
        {
          messageId: 'no-import-allowed',
          data: {
            importFile: 'src/legacy/Foo',
          },
        },
      ],
    },
  ],
});
