import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AssignmentCard from './AssignmentCard';
import SQLEditor from './SQLEditor';
import ResultsTable from './ResultsTable';
import SchemaViewer from './SchemaViewer';

const API_URL = 'http://localhost:5000/api';

const SQLStudio = ({ user, onLogout }) => {
  const [view, setView] = useState('assignments');
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResults, setQueryResults] = useState(null);
  const [queryError, setQueryError] = useState(null);

  const [hint, setHint] = useState('');
  const [showHint, setShowHint] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem('token');

  // ✅ Fetch assignments from backend
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get(`${API_URL}/assignments`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setAssignments(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAssignments();
  }, []);

  const handleSelectAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setView('attempt');
    setSqlQuery('');
    setQueryResults(null);
    setQueryError(null);
    setHint('');
    setShowHint(false);
  };

  const handleBack = () => {
    setView('assignments');
    setSelectedAssignment(null);
  };

  // ✅ Execute SQL using backend
  const handleExecuteQuery = async () => {
    try {
      setIsLoading(true);
      setQueryError(null);
      setQueryResults(null);

      const res = await axios.post(
        `${API_URL}/queries/execute`,
        {
          assignmentId: selectedAssignment._id,
          query: sqlQuery
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.data.success) {
        setQueryResults(res.data.data);
      } else {
        setQueryError(res.data.message);
      }

    } catch (err) {
      setQueryError(
        err.response?.data?.message || 'Query execution failed'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Get Hint from backend (LLM)
  const handleGetHint = async () => {
    try {
      setIsLoading(true);

      const res = await axios.post(
        `${API_URL}/hint`,
        {
          assignmentId: selectedAssignment._id,
          query: sqlQuery
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.data.success) {
        setHint(res.data.hint);
        setShowHint(true);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="app">
      <header className="app-header">
        <div className="app-header__content">
          <h1 className="app-header__title">
            <span className="app-header__icon">⚡</span>
            CipherSQLStudio
          </h1>
          <div className="app-header__user">
            <span>Welcome, {user.name}</span>
            <button className="btn btn--secondary" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </header>

      <main className="app-main">
        {view === 'assignments' && (
          <div className="assignments-view">
            <div className="assignments-view__header">
              <h2>Available Assignments</h2>
              <p>Select an assignment to start practicing SQL</p>
            </div>

            <div className="assignments-grid">
              {assignments.map((assignment) => (
                <AssignmentCard
                  key={assignment._id}
                  assignment={assignment}
                  onSelect={handleSelectAssignment}
                />
              ))}
            </div>
          </div>
        )}

        {view === 'attempt' && selectedAssignment && (
          <div className="attempt-view">
            <button onClick={handleBack}>← Back to Assignment</button>

            <h2>{selectedAssignment.title}</h2>

            <div className="attempt-layout">
              <aside className="attempt-sidebar">
                <div className="question-panel">
                  <h3 className="question-panel__title">Question</h3>
                  <p className="question-panel__text">{selectedAssignment.question}</p>
                </div>
                
                <SchemaViewer tables={selectedAssignment.tables} />
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
                        <button 
                          className="hint-box__close"
                          onClick={() => setShowHint(false)}
                        >
                          ×
                        </button>
                      </div>
                      <p>{hint}</p>
                    </div>
                  )}
                </div>

                <div className="results-section">
                  <h3 className="results-section__title">Query Results</h3>
                  <ResultsTable data={queryResults} error={queryError} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SQLStudio;