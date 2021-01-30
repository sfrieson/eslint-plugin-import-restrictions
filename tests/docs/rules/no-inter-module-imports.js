var rule = require('../../../lib/rules/no-inter-module-imports');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester({
  parserOptions: { sourceType: 'module', ecmaVersion: 2015 },
});

const intro = {
  options: ['src/modules/Foo', 'src/modules/Bar'],
  file: 'src/modules/Foo/index.js',
  valid: `
import styles from './styles.css';
import utils from 'src/modules/Foo/utils.js';
import commonStyles from '../common/styles.css';
import commonUtils from 'src/modules/common/utils.js';`,
  invalid: `
import styles from '../Bar/styles.css';
import utils from 'src/modules/Bar/utils.js';`,
};
ruleTester.run('no-inter-module-imports docs.intro', rule, {
  valid: [
    {
      code: intro.valid,
      filename: intro.filename,
      options: intro.options,
    },
  ],
  invalid: [
    {
      code: intro.invalid,
      filename: intro.file,
      options: intro.options,
      errors: [
        {
          messageId: 'no-inter-module-imports',
          data: {
            importFile: 'src/modules/Bar/styles.css',
          },
        },
        {
          messageId: 'no-inter-module-imports',
          data: {
            importFile: 'src/modules/Bar/utils.js',
          },
        },
      ],
    },
  ],
});

const options1 = {
  options: [
    'src/components/Foo',
    'src/components/Bar',
    { moduleRoot: 'src/components/Baz' },
  ],
  file: 'src/components/Foo/index.js',
  valid: `
import styles from './styles.css';
import commonStyles from '../common/styles.css';
import Baz from 'src/components/Baz';`,
  invalid: `
import Bar from 'src/components/Bar';
import BazStyles from '../Baz/styles.css';`,
};

ruleTester.run('no-inter-module-imports options1', rule, {
  valid: [
    {
      code: options1.valid,
      filename: options1.filename,
      options: options1.options,
    },
  ],
  invalid: [
    {
      code: options1.invalid,
      filename: options1.file,
      options: options1.options,
      errors: [
        {
          messageId: 'no-inter-module-imports',
          data: {
            importFile: 'src/components/Bar',
          },
        },
        {
          messageId: 'no-inter-module-imports',
          data: {
            importFile: 'src/components/Baz/styles.css',
          },
        },
      ],
    },
  ],
});

const options2 = {
  options: [
    ['src/components/Foo', 'src/components/Bar'],
    ['src/modules/A', 'src/modules/B', 'src/modules/C'],
  ],
  a: {
    file: 'src/components/Foo/index.js',
    valid: `
import styles from './styles.css';
import A from 'src/modules/A';`,
    invalid: `import Bar from '../Bar';`,
  },
  b: {
    file: 'src/modules/A/index.js',
    valid: `import utils from './utils.js';`,
    invalid: `import B from 'src/modules/B';`,
  },
};

ruleTester.run('no-inter-module-imports options2', rule, {
  valid: [
    {
      code: options2.a.valid,
      filename: options2.a.filename,
      options: options2.options,
    },
    {
      code: options2.b.valid,
      filename: options2.b.filename,
      options: options2.options,
    },
  ],
  invalid: [
    {
      code: options2.a.invalid,
      filename: options2.a.file,
      options: options2.options,
      errors: [
        {
          messageId: 'no-inter-module-imports',
          data: {
            importFile: 'src/components/Bar',
          },
        },
      ],
    },
    {
      code: options2.b.invalid,
      filename: options2.b.file,
      options: options2.options,
      errors: [
        {
          messageId: 'no-inter-module-imports',
          data: {
            importFile: 'src/modules/B',
          },
        },
      ],
    },
  ],
});
