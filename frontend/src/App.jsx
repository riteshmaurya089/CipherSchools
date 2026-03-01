import React, { useState, useEffect } from 'react';
import './App.scss';
import LoginSignup from './components/LoginSignup';
import SQLStudio from './components/SQLStudio';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    // ✅ Only restore session if BOTH exist
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
      handleLogout();
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // ✅ remove JWT
    setUser(null);
  };

  return (
    <div className="app">
      {user ? (
        <SQLStudio user={user} onLogout={handleLogout} />
      ) : (
        <LoginSignup onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;