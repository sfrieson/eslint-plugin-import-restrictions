var rule = require('../../../lib/rules/no-import-allowed');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester({
  parserOptions: { sourceType: 'module', ecmaVersion: 2015 },
});
ruleTester.run('no-import-allowed', rule, {
  valid: [],
  invalid: [
    {
      code: "import Foo from 'src/legacy/Foo';",
      options: ['src/legacy/Foo'],
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
      code: "import FooStyles from '../../legacy/Foo/styles.css';",
      filename: 'src/components/NewFoo/index.js',
      options: ['src/legacy/Foo'],
      errors: [
        {
          messageId: 'no-import-allowed',
          data: {
            importFile: 'src/legacy/Foo/styles.css',
          },
        },
      ],
    },
  ],
});
