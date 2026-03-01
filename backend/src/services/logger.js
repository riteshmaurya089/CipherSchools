const chalk = require('chalk').default; // for chalk v5

const logger = {
  info: (message) => {
    console.log(chalk.blue(`[INFO] [${new Date().toISOString()}] ${message}`));
  },
  warn: (message) => {
    console.warn(chalk.yellow(`[WARN] [${new Date().toISOString()}] ${message}`));
  },
  error: (message) => {
    console.error(chalk.red(`[ERROR] [${new Date().toISOString()}] ${message}`));
  },
};

module.exports = logger;