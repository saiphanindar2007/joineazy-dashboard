// ─── USERS ──────────────────────────────────────────────────────────
export const INITIAL_STUDENTS = [
  { id: 's1', name: 'Aisha Patel',   email: 'aisha@student.edu',  avatar: 'AP', role: 'student', password: 'student123' },
  { id: 's2', name: 'Rohan Mehta',   email: 'rohan@student.edu',  avatar: 'RM', role: 'student', password: 'student123' },
  { id: 's3', name: 'Priya Sharma',  email: 'priya@student.edu',  avatar: 'PS', role: 'student', password: 'student123' },
  { id: 's4', name: 'Karan Singh',   email: 'karan@student.edu',  avatar: 'KS', role: 'student', password: 'student123' },
];

export const INITIAL_ADMINS = [
  { id: 'a1', name: 'Prof. Anjali Verma', email: 'anjali@university.edu', avatar: 'AV', role: 'admin', password: 'prof123' },
  { id: 'a2', name: 'Prof. Suresh Kumar', email: 'suresh@university.edu', avatar: 'SK', role: 'admin', password: 'prof123' },
];

// ─── COURSES ─────────────────────────────────────────────────────────
export const INITIAL_COURSES = [
  { id: 'c1', name: 'Data Structures & Algorithms', code: 'CS301', professorId: 'a1', color: '#5b8fff', semester: 'Sem 4 · 2026', enrolledStudents: ['s1','s2','s3','s4'] },
  { id: 'c2', name: 'Linear Algebra',               code: 'MA201', professorId: 'a1', color: '#00ddb3', semester: 'Sem 4 · 2026', enrolledStudents: ['s1','s2','s3'] },
  { id: 'c3', name: 'Database Systems',             code: 'CS302', professorId: 'a2', color: '#f5c842', semester: 'Sem 4 · 2026', enrolledStudents: ['s1','s2','s3','s4'] },
  { id: 'c4', name: 'Operating Systems',            code: 'CS401', professorId: 'a2', color: '#ff6b9d', semester: 'Sem 4 · 2026', enrolledStudents: ['s2','s3','s4'] },
];

// ─── GROUPS ──────────────────────────────────────────────────────────
export const INITIAL_GROUPS = [
  { id: 'g1', courseId: 'c1', name: 'Alpha Squad', leaderId: 's1', members: ['s1','s2'] },
  { id: 'g2', courseId: 'c1', name: 'Beta Force',  leaderId: 's3', members: ['s3','s4'] },
  { id: 'g3', courseId: 'c3', name: 'DB Masters',  leaderId: 's1', members: ['s1','s3'] },
];

// ─── ASSIGNMENTS ─────────────────────────────────────────────────────
// submissions: { [studentId]: ISO_timestamp }
// For GROUP: when leader submits, all member IDs written simultaneously.
export const INITIAL_ASSIGNMENTS = [
  {
    id: 'asgn1', courseId: 'c1',
    title: 'Binary Trees Implementation',
    description: 'Implement an AVL tree with insertion, deletion, and balanced search. Include a written time-complexity analysis in your report.',
    dueDate: '2026-04-05T23:59', driveLink: 'https://drive.google.com/drive/folders/example1',
    submissionType: 'individual', createdBy: 'a1', createdAt: '2026-03-25',
    submissions: { 's1': '2026-03-28T10:30:00', 's3': '2026-03-29T14:20:00' },
  },
  {
    id: 'asgn2', courseId: 'c1',
    title: 'Graph Traversal Comparative Report',
    description: 'As a group, compare BFS and DFS with diagrams, code samples, and real-world use-case analysis. One submission per group.',
    dueDate: '2026-04-08T23:59', driveLink: 'https://drive.google.com/drive/folders/example2',
    submissionType: 'group', createdBy: 'a1', createdAt: '2026-03-26',
    submissions: { 's1': '2026-03-30T09:15:00', 's2': '2026-03-30T09:15:00' },
  },
  {
    id: 'asgn3', courseId: 'c2',
    title: 'Eigenvalues & Eigenvectors Problem Set',
    description: 'Solve all 10 problems from Chapter 4. Show full working steps. Upload scanned PDF or typed solution to the Drive folder.',
    dueDate: '2026-04-08T23:59', driveLink: 'https://drive.google.com/drive/folders/example3',
    submissionType: 'individual', createdBy: 'a1', createdAt: '2026-03-26',
    submissions: { 's2': '2026-03-27T16:00:00' },
  },
  {
    id: 'asgn4', courseId: 'c3',
    title: 'ER Diagram: Hospital Management System',
    description: 'Design a complete ER diagram for a hospital covering patients, doctors, wards, billing, and appointments. Group submission only.',
    dueDate: '2026-04-03T23:59', driveLink: 'https://drive.google.com/drive/folders/example4',
    submissionType: 'group', createdBy: 'a2', createdAt: '2026-03-24',
    submissions: { 's1': '2026-03-28T11:00:00', 's3': '2026-03-28T11:00:00' },
  },
  {
    id: 'asgn5', courseId: 'c4',
    title: 'Process Scheduling Simulation',
    description: 'Simulate FCFS, SJF, and Round Robin. Generate performance charts comparing waiting time, turnaround time, and CPU utilisation.',
    dueDate: '2026-04-10T23:59', driveLink: 'https://drive.google.com/drive/folders/example5',
    submissionType: 'individual', createdBy: 'a2', createdAt: '2026-03-27',
    submissions: {},
  },
  {
    id: 'asgn6', courseId: 'c3',
    title: 'SQL Query Optimisation Report',
    description: 'Analyse and optimise 5 complex SQL queries using indexing, query plans, and normalisation. Write a 2-page report on findings.',
    dueDate: '2026-04-12T23:59', driveLink: 'https://drive.google.com/drive/folders/example6',
    submissionType: 'individual', createdBy: 'a2', createdAt: '2026-03-28',
    submissions: { 's2': '2026-04-01T08:45:00', 's4': '2026-04-01T20:10:00' },
  },
];
