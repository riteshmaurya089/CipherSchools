const forbiddenPatterns = [
  /DROP\s+TABLE/i,
  /DELETE\s+FROM/i,
  /TRUNCATE\s+TABLE/i,
  /ALTER\s+TABLE/i,
  /INSERT\s+INTO/i, // Optional: prevent data modifications
];

const querySanitizer = (req, res, next) => {
  const { query } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ success: false, message: 'SQL query is required' });
  }

  const isForbidden = forbiddenPatterns.some((pattern) => pattern.test(query));
  if (isForbidden) {
    return res.status(400).json({
      success: false,
      message: 'Forbidden SQL operation detected. Only SELECT queries are allowed.',
    });
  }

  next();
};

module.exports = querySanitizer;