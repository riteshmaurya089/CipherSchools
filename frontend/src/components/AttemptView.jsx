import React, { useState } from 'react';
import axios from 'axios';
import SQLEditor from './SQLEditor';
import ResultsTable from './ResultsTable';
import SchemaViewer from './SchemaViewer';

const AttemptView = ({ assignment, onBack }) => {
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResults, setQueryResults] = useState(null);
  const [queryError, setQueryError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hint, setHint] = useState('');

  // ✅ Execute Query From Backend
  const handleExecuteQuery = async () => {
    if (!sqlQuery.trim()) return;

    try {
      setIsLoading(true);
      setQueryError(null);

      const res = await axios.post(
        'http://localhost:5000/api/queries/execute',
        {
          assignmentId: assignment._id,
          query: sqlQuery,
        }
      );

      if (res.data.success) {
        setQueryResults(res.data.data);
        setQueryError(null);
      } else {
        setQueryResults(null);
        setQueryError(res.data.error || 'Query failed');
      }

    } catch (error) {
      setQueryResults(null);
      setQueryError(
        error.response?.data?.error || 'Server connection error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Get Hint From Backend
  const handleGetHint = async () => {
    try {
      setIsLoading(true);

      const res = await axios.post(
        'http://localhost:5000/api/hint',
        {
          assignmentId: assignment._id,
          query: sqlQuery,
        }
      );

      if (res.data.success) {
        setHint(res.data.hint);
        setShowHint(true);
      }

    } catch (error) {
      setHint('Unable to fetch hint from server.');
      setShowHint(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="attempt-view">
      <div className="attempt-view__header">
        <button className="btn btn--back" onClick={onBack}>
          ← Back to Assignments
        </button>
        <h2>{assignment?.title}</h2>
      </div>

      <div className="attempt-layout">
        <aside className="attempt-sidebar">
          <div className="question-panel">
            <h3>Question</h3>
            <p>{assignment?.question}</p>
          </div>

          <SchemaViewer tables={assignment?.tables || []} />
        </aside>

        <div className="attempt-main">
          <div className="editor-section">
            <div className="editor-section__header">
              <h3>SQL Query Editor</h3>
              <div className="editor-actions">
                <button
                  className="btn btn--secondary"
                  onClick={handleGetHint}
                  disabled={isLoading}
                >
                  💡 Get Hint
                </button>

                <button
                  className="btn btn--primary"
                  onClick={handleExecuteQuery}
                  disabled={isLoading || !sqlQuery.trim()}
                >
                  {isLoading ? 'Executing...' : '▶ Execute Query'}
                </button>
              </div>
            </div>

            <SQLEditor value={sqlQuery} onChange={setSqlQuery} />

            {showHint && (
              <div className="hint-box">
                <div className="hint-box__header">
                  <strong>💡 Hint:</strong>
                  <button onClick={() => setShowHint(false)}>×</button>
                </div>
                <p>{hint}</p>
              </div>
            )}
          </div>

          <div className="results-section">
            <h3>Query Results</h3>
            <ResultsTable data={queryResults} error={queryError} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttemptView;