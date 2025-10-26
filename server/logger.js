/* eslint-disable no-console */
const os = require('os');

// Dynamically import chalk (ESM-only)
let chalk;
(async () => {
  chalk = (await import('chalk')).default;
  console.log(chalk.green('Logger initialized.'));
})();

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();

  for (const interfaceName of Object.keys(interfaces)) {
    for (const iface of interfaces[interfaceName] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }

  return '127.0.0.1'; // fallback
}

const serverIp = getLocalIpAddress();

const logger = {
  error: err => {
    if (chalk) {
      console.error(chalk.red(err));
    } else {
      console.error(err);
    }
  },

  appStarted: (port, host, tunnelStarted) => {
    if (!chalk) {
      console.log(`Server started!`);
      return;
    }

    const divider = chalk.gray('\n-----------------------------------');

    console.log(`Server started! ${chalk.green('✓')}`);

    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`);
    }

    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      LAN: ${chalk.magenta(`http://${serverIp}:${port}`) +
        (tunnelStarted
          ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}`
          : '')}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  },
};

module.exports = logger;
