const { execSync } = require('child_process');

try {
  execSync('npx commitlint --edit $1', { stdio: 'inherit' });
} catch (error) {
  console.error('✖ Commitlint failed. Please follow the commit message conventions.');
  console.error('Usage: <type>(<scope>): <subject>');
  console.error('Types: build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test');
  console.error('Subject should be concise and descriptive.');
  console.error('Refer to the documentation: https://github.com/conventional-changelog/commitlint');
  process.exit(1);
}
