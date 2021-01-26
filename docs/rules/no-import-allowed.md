# no-import-allowed

Some files/directories should not be imported from at all. This could because it is legacy code that is being removed, it could be debug-only code, or other reasons. This throws an error for those files.

```javascript
/* Options
['src/legacy/Foo'],
*/

// From file src/module/NewFoo/index.js

// ❌
import Foo from 'src/legacy/Foo';
```

## Rule details

This rule disallows the importing of a module or file.

### Options

The options accept an array of module to disallow.

```javascript
// Options
{
  ...
  "rules": {
    "import-restrictions/no-import-allowed": [
      "src/legacy/Foo",
    ]
  }
  ...
}

// src/components/Foo/index.js

❌ import Bar from 'src/legacy/Foo';
```
