import React from 'react';

const ResultsTable = ({ data, error }) => {
  // ✅ Show error
  if (error) {
    return (
      <div className="results-error">
        <strong>Error:</strong>
        <p>{error}</p>
      </div>
    );
  }

  // ✅ Handle non-array or empty results
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="results-empty">
        <p>No results to display. Execute a query to see results.</p>
      </div>
    );
  }

  const columns = Object.keys(data[0] || {});

  return (
    <div className="results-table-container">
      <div className="results-table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={row._id || rowIndex}>
                {columns.map((col) => (
                  <td key={`${rowIndex}-${col}`}>
                    {row[col] !== null && row[col] !== undefined
                      ? String(row[col])
                      : 'NULL'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="results-info">
        {data.length} row{data.length !== 1 ? 's' : ''} returned
      </div>
    </div>
  );
};

export default ResultsTable;