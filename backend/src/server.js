const app = require('./app');
const { PORT } = require('./config/envconfig');
const logger = require('./services/logger');

// Start server
app.listen(PORT, () => {
  logger.info(`cipherschool Backend running on http://localhost:${PORT}`);
});