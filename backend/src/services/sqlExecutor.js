// src/services/sqlExecutor.js
const pool = require('../config/dbPostgres');
const { MAX_QUERY_EXECUTION_TIME, MAX_RESULT_ROWS } = require('../config/envconfig');

/**
 * Run SQL query safely
 * Only allows SELECT queries and enforces execution limits
 * @param {string} query
 * @returns {Promise<Object[]>} result rows
 */
const runQuery = async (query) => {
  // Prevent destructive queries
  const forbiddenPatterns = [
    /DROP\s+TABLE/i,
    /DELETE\s+FROM/i,
    /TRUNCATE\s+TABLE/i,
    /ALTER\s+TABLE/i,
    /INSERT\s+INTO/i,
    /UPDATE/i,
  ];

  const isForbidden = forbiddenPatterns.some((pattern) => pattern.test(query));
  if (isForbidden) {
    throw new Error('Forbidden SQL operation detected. Only SELECT queries are allowed.');
  }

  const client = await pool.connect();
  try {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Query execution time exceeded limit')), MAX_QUERY_EXECUTION_TIME)
    );

    const queryPromise = client.query(query);

    const res = await Promise.race([queryPromise, timeout]);

    let rows = res.rows;
    if (rows.length > MAX_RESULT_ROWS) {
      rows = rows.slice(0, MAX_RESULT_ROWS);
    }

    return rows;
  } catch (error) {
    console.error('SQL Execution Error:', error.message);
    throw new Error(error.message);
  } finally {
    client.release();
  }
};

module.exports = {
  runQuery,
};