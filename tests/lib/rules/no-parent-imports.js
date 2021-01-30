var rule = require('../../../lib/rules/no-parent-imports');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester({
  parserOptions: { sourceType: 'module', ecmaVersion: 2015 },
});

const intro = {
  valid: `
import moduleFoo from 'foo';
import localFoo from './foo';
import myStuffFoo from './my-stuff/foo';`,
  invalid: `
import cousinFoo from '../foo';
import distantFoo from '../../their-stuff/foo';`,
};
ruleTester.run('no-parent-imports docs examples', rule, {
  valid: [intro.valid],
  invalid: [
    {
      code: intro.invalid,
      errors: [
        { messageId: 'no-parent-imports' },
        { messageId: 'no-parent-imports' },
      ],
    },
  ],
});
