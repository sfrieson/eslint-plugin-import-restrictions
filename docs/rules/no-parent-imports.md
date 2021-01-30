# no-parent-imports

If directory structures are organized from general to specific, an opinion can be held that a file should not know about anything more general than itself, and when it does need to, it is a sign that some part of that file should be promoted to a more generic area.

```javascript
// ✅
import moduleFoo from 'foo';
import localFoo from './foo';
import myStuffFoo from './my-stuff/foo';

// ❌
import cousinFoo from '../foo';
import distantFoo from '../../their-stuff/foo';
```

## Options

This rule currently accepts no options.

## Future

Future improvements are planned to support supplying a list of files/directories to which this rule should apply.
