import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import { INITIAL_STUDENTS, INITIAL_ADMINS, INITIAL_ASSIGNMENTS } from './data/mockData';

const ALL_USERS = [...INITIAL_STUDENTS, ...INITIAL_ADMINS];

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAssignments = localStorage.getItem('joineazy_assignments');
    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments));
    } else {
      setAssignments(INITIAL_ASSIGNMENTS);
      localStorage.setItem('joineazy_assignments', JSON.stringify(INITIAL_ASSIGNMENTS));
    }
    const savedUser = localStorage.getItem('joineazy_user');
    if (savedUser) {
      try { setCurrentUser(JSON.parse(savedUser)); } catch (e) { /* ignore */ }
    }
    setTimeout(() => setLoading(false), 400);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('joineazy_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('joineazy_user');
  };

  const updateAssignments = (updated) => {
    setAssignments(updated);
    localStorage.setItem('joineazy_assignments', JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="app-loader">
        <div className="loader-logo">
          <span className="loader-icon">⬡</span>
          <span>Joineazy</span>
        </div>
        <div className="loader-bar"><div className="loader-fill" /></div>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginPage allUsers={ALL_USERS} onLogin={handleLogin} />;
  }

  if (currentUser.role === 'student') {
    return (
      <StudentDashboard
        user={currentUser}
        assignments={assignments}
        onLogout={handleLogout}
        onUpdateAssignments={updateAssignments}
      />
    );
  }

  return (
    <AdminDashboard
      user={currentUser}
      assignments={assignments}
      students={INITIAL_STUDENTS}
      onLogout={handleLogout}
      onUpdateAssignments={updateAssignments}
    />
  );
}

export default App;
