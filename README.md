# eslint-plugin-import-restrictions

An ESLint plugin to support restricting from which directories and files importing is allowed.

## Rules

- `no-parent-imports` ([docs](docs/rules/no-parent-imports.md)) - Disallows importing any path that requires accessing a parent directory.
- `no-inter-module-imports` ([docs](docs/rules/no-inter-module-imports.md)) - Disallows importing from any other designated module.
- `no-import-allowed` ([docs](docs/rules/no-import-allowed.md)) - Disallows importing a particular file or directory.

## Roadmap

- [x] `no-parent-imports`
- [ ] Add an ignore property to the `no-parent-imports` rule to allow certain file globs to opt out of the rule.
- [x] `no-inter-module-imports` - Disallow import sources from going beyond a particular ancestor.
- [ ] Add the ability for `no-inter-module-imports` to be broken for specific files.
- [x] `no-import-allowed` - Disallow importing a particular resource
- [ ] Allow exceptions to `no-import-allowed` from particular globs.
