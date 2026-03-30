export const INITIAL_STUDENTS = [
  { id: 's1', name: 'Aisha Patel',   email: 'aisha@student.edu',  avatar: 'AP', role: 'student' },
  { id: 's2', name: 'Rohan Mehta',   email: 'rohan@student.edu',  avatar: 'RM', role: 'student' },
  { id: 's3', name: 'Priya Sharma',  email: 'priya@student.edu',  avatar: 'PS', role: 'student' },
  { id: 's4', name: 'Karan Singh',   email: 'karan@student.edu',  avatar: 'KS', role: 'student' },
];

export const INITIAL_ADMINS = [
  { id: 'a1', name: 'Prof. Anjali Verma', email: 'anjali@university.edu', avatar: 'AV', role: 'admin' },
  { id: 'a2', name: 'Prof. Suresh Kumar', email: 'suresh@university.edu', avatar: 'SK', role: 'admin' },
];

export const INITIAL_ASSIGNMENTS = [
  {
    id: 'asgn1',
    title: 'Data Structures: Binary Trees',
    description: 'Implement AVL tree with insertion, deletion, and search operations. Include time complexity analysis in your report.',
    subject: 'Computer Science',
    dueDate: '2026-04-05',
    driveLink: 'https://drive.google.com/drive/folders/example1',
    createdBy: 'a1',
    createdAt: '2026-03-25',
    submissions: ['s1', 's3'],
  },
  {
    id: 'asgn2',
    title: 'Linear Algebra: Eigenvalues',
    description: 'Solve the given problem set on eigenvalues and eigenvectors. Show all working steps clearly.',
    subject: 'Mathematics',
    dueDate: '2026-04-08',
    driveLink: 'https://drive.google.com/drive/folders/example2',
    createdBy: 'a1',
    createdAt: '2026-03-26',
    submissions: ['s2'],
  },
  {
    id: 'asgn3',
    title: 'Database Design: ER Diagrams',
    description: 'Design a complete ER diagram for a hospital management system. Include all entities, attributes, and relationships.',
    subject: 'Database Systems',
    dueDate: '2026-04-03',
    driveLink: 'https://drive.google.com/drive/folders/example3',
    createdBy: 'a2',
    createdAt: '2026-03-24',
    submissions: ['s1', 's2', 's4'],
  },
  {
    id: 'asgn4',
    title: 'OS: Process Scheduling Simulation',
    description: 'Simulate FCFS, SJF, and Round Robin scheduling. Compare performance metrics with charts.',
    subject: 'Operating Systems',
    dueDate: '2026-04-10',
    driveLink: 'https://drive.google.com/drive/folders/example4',
    createdBy: 'a2',
    createdAt: '2026-03-27',
    submissions: [],
  },
];
