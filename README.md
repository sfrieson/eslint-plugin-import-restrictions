# eslint-plugin-import-restrictions

An ESLint plugin to support restricting from which directories and files importing is allowed.

## Installation

To start using these rules, first install that plugin:

```
npm install --save-dev eslint-plugin-import-restrictions
```

Then to your [ESLint config](https://eslint.org/docs/user-guide/configuring) add the the plugin:

```json
{
  ...
  "plugins": ["import-restrictions"],
  ...
}
```

Finally, decide which rule(s) you'd like to use. Some of them require options to be effective to check the documentation for the particular rule you'd like to use. The ESLint rule setting always comes first, and then the rule options. Each rule is `"off"` (`0`) by default. Here is more details about [configuring rules](https://eslint.org/docs/user-guide/configuring#configuring-rules).

```diff
  {
    ...
+   "rules": {
+     "import-restrictions/no-parent-imports": "error"
+   },
    "plugins": ["import-restrictions"],
    ...
  }

```

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
