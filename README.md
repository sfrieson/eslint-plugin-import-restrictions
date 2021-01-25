# eslint-plugin-import-restrictions

An ESLint plugin to support restricting from which directories and files importing is allowed.

## Rules

- [`no-parent-imports](docs/rules/no-parent-imports.md) - Disallows importing any path that requires accessing a parent directory.

## Roadmap

- [x] `no-parent-imports`
- [ ] disallow all import sources that require going into a from parent directory.
- [ ] Add an ignore property to the `no-parent-imports` rule to allow certain file globs to opt out of the rule.
- [ ] `no-intra-module-imports` - Disallow import sources from going beyond a particular ancestor.
- [ ] Add the ability for `no-intra-module-imports` to be broken for specific directories.
- [ ] `no-import-allowed` - Disallow importing a particular resource
- [ ] Allow exceptions to `no-import-allowed` from particular globs.
