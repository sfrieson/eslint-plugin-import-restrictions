module.exports = {
  rules: {
    'no-import-allowed': require('./rules/no-import-allowed'),
    'no-inter-module-imports': require('./rules/no-inter-module-imports'),
    'no-parent-imports': require('./rules/no-parent-imports'),
  },
};
