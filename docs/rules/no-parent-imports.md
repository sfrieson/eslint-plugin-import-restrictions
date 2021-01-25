# no-parent-imports

If directory structures are organized from general to specific, an opinion can be held that a file should not know about anything more general than itself, and when it does need to, it is a sign that some part of that file should be promoted to a more generic area.

```javascript
// ✅
import foo from 'foo';
import foo from './foo';
import foo from './my-stuff/foo';

// ❌
import foo from '../foo';
import foo from '../../their-stuff/foo';
```
