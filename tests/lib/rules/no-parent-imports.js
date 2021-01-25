var rule = require('../../../lib/rules/no-parent-imports');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester({
  parserOptions: { sourceType: 'module', ecmaVersion: 2015 },
});
ruleTester.run('no-parent-imports', rule, {
  valid: ["import foo from './foo';", "import foo from 'foo';"],
  invalid: [
    {
      code: "import foo from '../foo';",
      errors: [
        {
          messageId: 'no-parent-imports',
        },
      ],
    },
  ],
});
