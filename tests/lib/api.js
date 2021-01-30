/* globals describe, it */
const fs = require('fs');
const path = require('path');

const api = require('../../lib/api');

describe('api', () => {
  const repoRoot = path.resolve(__dirname, '..', '..');
  describe('rules', () => {
    const rulesDir = fs.readdirSync(path.resolve(repoRoot, 'lib', 'rules'));
    const ruleDocs = new Set(
      fs.readdirSync(path.resolve(repoRoot, 'docs', 'rules'))
    );
    const ruleTests = new Set(fs.readdirSync(path.resolve(__dirname, 'rules')));
    const readmeText = fs.readFileSync(path.resolve(repoRoot, 'README.md'), {
      encoding: 'utf-8',
    });
    rulesDir.forEach((ruleFile) => {
      const ruleName = ruleFile.split('.')[0];
      describe(ruleName, () => {
        it('has an entry in the API', () => {
          if (!api.rules[ruleName]) {
            throw new Error('API does not have a value for that key.');
          }
        });

        it('has documentation', () => {
          if (!ruleDocs.has(`${ruleName}.md`)) {
            throw new Error(
              `${path.join('docs', 'rules', ruleName + '.md')} not found`
            );
          }
        });

        it('is in the README with a link to the documentation', () => {
          // There should be an entry in the documentation like:
          // - `rule-name` ([docs](docs/rules/rule-name.md)) - Description
          const index = readmeText.indexOf(
            `- \`${ruleName}\` ([docs](docs/rules/${ruleName}.md))`
          );
          if (index === -1) {
            throw new Error('rule with documentation link was not found');
          }
        });

        it('has tests', () => {
          if (!ruleTests.has(`${ruleName}.js`)) {
            throw new Error(
              `${path.join(
                'tests',
                'lib',
                'rules',
                ruleName + '.js'
              )} not found`
            );
          }
        });
      });
    });
  });
});
