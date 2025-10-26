(async () => {
  const chalk = await import('chalk');
  console.log(chalk.default.green('Logger initialized.'));
})();

/**
 * Adds mark cross symbol
 */
function addXMark(callback) {
  process.stdout.write(chalk.red(' ✘'));
  if (callback) callback();
}

module.exports = addXMark;
