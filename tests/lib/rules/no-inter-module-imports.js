var rule = require('../../../lib/rules/no-inter-module-imports');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester({
  parserOptions: { sourceType: 'module', ecmaVersion: 2015 },
});
ruleTester.run('no-inter-module-imports', rule, {
  valid: [
    // relative, within same module
    {
      code: "import stylesRelative from './styles.css';",
      filename: 'src/modules/Foo/index.js',
      options: ['src/modules/Foo'],
    },
    // relative, within same module
    {
      code: "import styles from '../styles.css';",
      filename: 'src/modules/Foo/index.js',
      options: [{ moduleRoot: 'src/modules/Foo' }],
    },
    // absolute, within same module
    {
      code: "import styles from 'src/modules/Foo/styles.css';",
      filename: 'src/modules/Foo/index.js',
      options: ['src/modules/Foo'],
    },
    // relative, to non-module
    {
      code: "import BazStyles from '../Baz/styles.css';",
      filename: 'src/modules/Foo/index.js',
      options: ['src/modules/Foo', 'src/modules/Bar'],
    },
    // absolute, to non-module file
    {
      code: "import BazStyles from 'src/modules/Baz/styles.css';",
      filename: 'src/modules/Foo/index.js',
      options: ['src/modules/Foo', { moduleRoot: 'src/modules/Bar' }],
    },
    // absolute, to non-module directory
    {
      code: "import BazStyles from 'src/modules/Baz';",
      filename: 'src/modules/Foo/index.js',
      options: ['src/modules/Foo', 'src/modules/Bar'],
    },
    // to an unrelated module directory
    {
      code: "import A from 'src/components/A';",
      filename: 'src/modules/Foo/index.js',
      options: [
        ['src/modules/Foo', 'src/modules/Bar'],
        ['src/components/A', 'src/components/B'],
      ],
    },
  ],
  invalid: [
    // relative, to another module's file
    {
      code: "import BarStyles from '../Bar/styles.css';",
      filename: 'src/modules/Foo/index.js',
      options: ['src/modules/Foo', 'src/modules/Bar'],
      errors: [
        {
          messageId: 'no-inter-module-imports',
          data: {
            importFile: 'src/modules/Bar/styles.css',
          },
        },
      ],
    },
    // relative, to another module's directory
    {
      code: "import Bar from '../Bar';",
      filename: 'src/modules/Foo/index.js',
      options: ['src/modules/Foo', { moduleRoot: 'src/modules/Bar' }],
      errors: [
        {
          messageId: 'no-inter-module-imports',
          data: {
            importFile: 'src/modules/Bar',
          },
        },
      ],
    },
    // absolute, to another module's file
    {
      code: "import BarStyles from 'src/modules/Bar/styles.css';",
      filename: 'src/modules/Foo/index.js',
      options: ['src/modules/Foo', 'src/modules/Bar'],
      errors: [
        {
          messageId: 'no-inter-module-imports',
          data: {
            importFile: 'src/modules/Bar/styles.css',
          },
        },
      ],
    },
    // absolute, to another module's directory
    {
      code: "import Bar from 'src/modules/Bar';",
      filename: 'src/modules/Foo/index.js',
      options: ['src/modules/Foo', 'src/modules/Bar'],
      errors: [
        {
          messageId: 'no-inter-module-imports',
          data: {
            importFile: 'src/modules/Bar',
          },
        },
      ],
    },
    // to an related module directory with multiple module configs
    {
      code: "import A from 'src/components/A'; import 'src/modules/Bar';",
      filename: 'src/modules/Foo/index.js',
      options: [
        ['src/modules/Foo', 'src/modules/Bar'],
        ['src/components/A', 'src/components/B'],
      ],
      errors: [
        {
          messageId: 'no-inter-module-imports',
          data: {
            importFile: 'src/modules/Bar',
          },
        },
      ],
    },
  ],
});
