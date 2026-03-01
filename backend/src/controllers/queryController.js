const sqlExecutor = require('../services/sqlExecutor');

const executeQuery = async (req, res, next) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ success: false, message: 'Query is required' });
    }

    const result = await sqlExecutor.runQuery(query);

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  executeQuery,
};