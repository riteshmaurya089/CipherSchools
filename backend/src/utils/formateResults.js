/**
 * Formats SQL query result rows into a clean structure
 * Example: converts [ { id: 1, name: 'Alice' }, ... ] to { columns: [...], rows: [...] }
 * @param {Array<Object>} rows - Result rows from PostgreSQL
 * @returns {Object} { columns: Array, rows: Array<Array> }
 */
const formatResults = (rows) => {
  if (!rows || rows.length === 0) {
    return { columns: [], rows: [] };
  }

  const columns = Object.keys(rows[0]);
  const dataRows = rows.map((row) => columns.map((col) => row[col]));

  return { columns, rows: dataRows };
};

module.exports = formatResults;