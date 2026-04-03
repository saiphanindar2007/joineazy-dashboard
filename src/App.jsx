import React, { useState, useEffect, useCallback } from 'react';
import LoginPage from './components/LoginPage';
import StudentCourseDashboard from './components/StudentCourseDashboard';
import StudentAssignmentsPage from './components/StudentAssignmentsPage';
import AdminCourseDashboard from './components/AdminCourseDashboard';
import AdminAssignmentsPage from './components/AdminAssignmentsPage';
import { INITIAL_STUDENTS, INITIAL_ADMINS, INITIAL_COURSES, INITIAL_GROUPS, INITIAL_ASSIGNMENTS } from './data/mockData';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers]             = useState([]);
  const [courses, setCourses]         = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [groups, setGroups]           = useState([]);
  const [view, setView]               = useState({ page: 'courses', courseId: null });
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    const load = (key, fallback, setter) => {
      const raw = localStorage.getItem(key);
      setter(raw ? JSON.parse(raw) : fallback);
      if (!raw) localStorage.setItem(key, JSON.stringify(fallback));
    };
    load('jz_users',       [...INITIAL_STUDENTS, ...INITIAL_ADMINS], setUsers);
    load('jz_courses',     INITIAL_COURSES,                          setCourses);
    load('jz_assignments', INITIAL_ASSIGNMENTS,                      setAssignments);
    load('jz_groups',      INITIAL_GROUPS,                           setGroups);
    try {
      const saved = localStorage.getItem('jz_user');
      if (saved) setCurrentUser(JSON.parse(saved));
    } catch(e) {}
    setTimeout(() => setLoading(false), 380);
  }, []);

  const saveUsers      = (u) => { setUsers(u);        localStorage.setItem('jz_users',       JSON.stringify(u)); };
  const saveCourses    = (c) => { setCourses(c);       localStorage.setItem('jz_courses',     JSON.stringify(c)); };
  const saveAssign     = (a) => { setAssignments(a);   localStorage.setItem('jz_assignments', JSON.stringify(a)); };
  const saveGroups     = (g) => { setGroups(g);        localStorage.setItem('jz_groups',      JSON.stringify(g)); };

  // Merge helper: receives updated course-scoped assignments, merges with rest
  const makeMergeAssign = useCallback((courseId) => (updatedCourseAsgn) => {
    const others = assignments.filter(a => a.courseId !== courseId);
    saveAssign([...others, ...updatedCourseAsgn]);
  }, [assignments]); // eslint-disable-line

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('jz_user', JSON.stringify(user));
    setView({ page: 'courses', courseId: null });
  };
  const handleRegister = (newUser) => {
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    if (newUser.role === 'student') {
      const updatedCourses = courses.map((c, i) =>
        i < 2 ? { ...c, enrolledStudents: [...(c.enrolledStudents || []), newUser.id] } : c
      );
      saveCourses(updatedCourses);
    }
    setCurrentUser(newUser);
    localStorage.setItem('jz_user', JSON.stringify(newUser));
    setView({ page: 'courses', courseId: null });
  };
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('jz_user');
    setView({ page: 'courses', courseId: null });
  };

  if (loading) return (
    <div className="app-loader">
      <div className="loader-logo"><span className="loader-icon">⬡</span><span>Joineazy</span></div>
      <div className="loader-bar"><div className="loader-fill" /></div>
    </div>
  );

  if (!currentUser) {
    return <LoginPage users={users} onLogin={handleLogin} onRegister={handleRegister} />;
  }

  const activeCourse = courses.find(c => c.id === view.courseId) || null;

  // ── Student ───────────────────────────────────────────────
  if (currentUser.role === 'student') {
    const myCourses = courses.filter(c => c.enrolledStudents?.includes(currentUser.id));
    if (view.page === 'assignments' && activeCourse) {
      const courseAssignments = assignments.filter(a => a.courseId === activeCourse.id);
      const mergeAssign = (updatedCourseAsgn) => {
        const others = assignments.filter(a => a.courseId !== activeCourse.id);
        saveAssign([...others, ...updatedCourseAsgn]);
      };
      return (
        <StudentAssignmentsPage
          user={currentUser}
          course={activeCourse}
          assignments={courseAssignments}
          groups={groups}
          users={users}
          onBack={() => setView({ page: 'courses', courseId: null })}
          onLogout={handleLogout}
          onUpdateAssignments={mergeAssign}
          onUpdateGroups={saveGroups}
        />
      );
    }
    return (
      <StudentCourseDashboard
        user={currentUser}
        courses={myCourses}
        assignments={assignments}
        onLogout={handleLogout}
        onSelectCourse={(id) => setView({ page: 'assignments', courseId: id })}
      />
    );
  }

  // ── Admin ─────────────────────────────────────────────────
  const profCourses = courses.filter(c => c.professorId === currentUser.id);
  if (view.page === 'assignments' && activeCourse) {
    const courseAssignments = assignments.filter(a => a.courseId === activeCourse.id);
    const mergeAssign = (updatedCourseAsgn) => {
      const others = assignments.filter(a => a.courseId !== activeCourse.id);
      saveAssign([...others, ...updatedCourseAsgn]);
    };
    return (
      <AdminAssignmentsPage
        user={currentUser}
        course={activeCourse}
        assignments={courseAssignments}
        allStudents={users.filter(u => u.role === 'student')}
        groups={groups}
        onBack={() => setView({ page: 'courses', courseId: null })}
        onLogout={handleLogout}
        onUpdateAssignments={mergeAssign}
      />
    );
  }
  return (
    <AdminCourseDashboard
      user={currentUser}
      courses={profCourses}
      allStudents={users.filter(u => u.role === 'student')}
      assignments={assignments}
      onLogout={handleLogout}
      onSelectCourse={(id) => setView({ page: 'assignments', courseId: id })}
      onUpdateCourses={saveCourses}
    />
  );
}

export default App;
