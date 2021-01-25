# no-parent-imports

Some repositories define their modules or features within themselves which should be treated as private realms, but can allow importing to and from any file within that module. This rule needs the mutually exlusive modules to be defined in an array together.

```javascript
/* Options
[{
  modules: ['src/module/Foo', 'src/module/Bar']
}]
*/

// From file src/module/Foo/index.js

// ✅
import styles from './styles.css';
import utils from 'src/modules/Foo/utils.js';
// `common` is allowed because it is not in the `modules` array
import styles from '../common/styles.css';
import utils from 'src/modules/common/utils.js';

// ❌
import styles from '../Bar/styles.css';
import utils from 'src/modules/Bar/utils.js';
```

## Rule details

This rule enforces privacy between related scopes.

### Options

The options accept modules as a relative string and as an object.

```javascript
// Options
{
  ...
  "rules": {
    "import-restrictions/no-inter-module-imports": [
      "src/components/Foo",
      "src/components/Bar",
      { "moduleRoot": "src/components/Baz", "public": ["."] }
    ]
  }
  ...
}

// src/components/Foo/index.js

✅ import styles from './styles.css';
✅ import commonStyles from '../common/styles.css';
✅ import Baz from 'src/components/Baz';

❌ import Bar from 'src/components/Bar';
❌ import BazStyles from '../Bar/styles.js';
```

The rule configuration also accepts multiple module config arrays, so you can have multiple separated configs.

```javascript

{
  ...
  "rules": {
    "import-restrictions/no-inter-module-imports": [
      ["src/components/Foo", "src/components/Bar"],
      ["src/modules/A", "src/modules/B", "src/modules/C"]
    ]
  }
  ...
}

// src/components/Foo/index.js
✅ import styles from './styles.css';
✅ import A from 'src/modules/A';

❌ import Bar from '../Bar';


// src/Modules/A/index.js
✅ import utils from './utils.js';

❌ import B from 'src/modules/B';
```

### Future options 🔮

```javascript
⚠️ // Not yet implemented
{
  ...
  "rules": {
    "import-restrictions/no-inter-module-imports": [
      { pattern: 'src/components/*', public: ['.'] },
      { pattern: 'src/modules/*', private: ['./*.css'] }
    ]
  }
  ...
}
```
