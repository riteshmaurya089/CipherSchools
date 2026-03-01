import React, { useState, useEffect } from 'react';
import * as monaco from 'monaco-editor';
const SQLEditor = ({ value = '', onChange }) => {
  const [MonacoEditor, setMonacoEditor] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let mounted = true;

    import('@monaco-editor/react')
      .then((module) => {
        if (mounted) {
          setMonacoEditor(() => module.default);
        }
      })
      .catch((err) => {
        console.error('Failed to load Monaco Editor:', err);
        setLoadError(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loadError) {
    return (
      <div className="sql-editor" style={{ padding: '1rem', color: 'red' }}>
        Failed to load SQL editor.
      </div>
    );
  }

  if (!MonacoEditor) {
    return (
      <div className="sql-editor" style={{ padding: '1rem' }}>
        Loading editor...
      </div>
    );
  }

  return (
    <MonacoEditor
      height="300px"
      language="sql"
      theme="vs-dark"
      value={value || ''}
      onChange={(val) => onChange(val || '')}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
        wordWrap: 'on',
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        tabCompletion: 'on',
        formatOnType: true,
        formatOnPaste: true,
      }}
    />
  );
};

export default SQLEditor;