(async () => {
  const chalk = await import('chalk');
  console.log(chalk.default.green('Logger initialized.'));
})();

/**
 * Adds mark check symbol
 */
function addCheckMark(callback) {
  process.stdout.write(chalk.green(' ✓'));
  if (callback) callback();
}

module.exports = addCheckMark;
