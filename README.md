# ⬡ Joineazy — Assignment & Review Dashboard

A modern, role-based assignment management system built for the **Joineazy Frontend Intern – Round 2** task. Designed with a dark luxury aesthetic, clean component architecture, and full role-based workflows for students and professors.

---

## 📌 Overview

**Joineazy Dashboard** is a frontend-focused single-page application that simulates a real-world university assignment management system. It supports two primary roles:

- 🏛 **Professor (Admin)** — Create and manage courses & assignments, track student submissions
- 🎓 **Student** — View enrolled courses, acknowledge assignments, manage groups

All data is handled via `localStorage` with mock seed data — no backend required.

---

## ✨ Features

### 🔐 Authentication
- Login with email + password (form-based)
- Register as Student or Professor with validation
- Quick-select demo users for instant preview
- Role-based redirect after login

### 🏛 Professor Functionalities
- Course dashboard showing all taught courses with class completion %
- Create new courses with custom accent colour
- Per-course assignment management page
- Create assignments (title, description, deadline + time, OneDrive/Drive link, Individual/Group type)
- Edit and delete assignments
- Analytics strip per course (submissions received, groups formed, completion rate)
- Per-assignment progress bars — Individual (per student) or Group (per group)
- Expandable student/group detail list with submission timestamps
- Filter assignments by: All / Individual / Group / Complete / Incomplete
- Search assignments by title

### 🎓 Student Functionalities
- Course dashboard showing all enrolled courses with per-course progress bars
- Overall submission progress ring (across all courses)
- Per-course assignment page with search and filter
- Filter by: All / Pending / Submitted / Overdue
- **Individual assignments** — 2-step double-verification acknowledgment flow
- **Group assignments** — only the Group Leader can acknowledge on behalf of the group
- When leader acknowledges → all group members are marked submitted simultaneously
- Timestamped acknowledgments (stored and displayed per submission)
- Group management — create a group, join an existing group, leave a group
- "Not in a group" warning prompt for group assignments
- Read more / Read less on long assignment descriptions

### 🎨 UI/UX Highlights
- Dark luxury aesthetic — deep navy base with electric blue + mint accents
- Animated blob background on login, grid overlay
- Sticky breadcrumb navigation
- Staggered card entrance animations
- Spring-effect modals
- Auto-dismiss toast notifications (success / error / info)
- Circular SVG progress rings
- Colour-coded progress bars (green = complete, blue = in progress, red = low)
- Fully responsive — mobile, tablet, desktop

---

## 🏗️ Project Architecture

```
joineazy/
│
├── index.html
├── package.json
├── vite.config.js
├── README.md
│
└── src/
    ├── App.jsx                        ← Root: state management + view routing
    ├── App.css                        ← All global styles (pure CSS, no Tailwind)
    ├── main.jsx                       ← React DOM entry point
    │
    ├── data/
    │   └── mockData.js                ← Seed: users, courses, groups, assignments
    │
    └── components/
        ├── LoginPage.jsx              ← Login form + Register form + quick-select
        ├── Navbar.jsx                 ← Sticky nav with breadcrumb trail
        ├── Toast.jsx                  ← Auto-dismiss notification system
        ├── StudentCourseDashboard.jsx ← Student: enrolled courses grid + stats
        ├── StudentAssignmentsPage.jsx ← Student: assignments, submit, group bar
        ├── GroupModal.jsx             ← Create / join / leave group per course
        ├── SubmitModal.jsx            ← 2-step acknowledgment (individual + group)
        ├── AdminCourseDashboard.jsx   ← Professor: courses overview + create course
        ├── AdminAssignmentsPage.jsx   ← Professor: analytics + manage assignments
        └── CreateAssignmentModal.jsx  ← Create / edit assignment form
```

---

## ⚙️ Tech Stack

| Layer        | Technology                    |
|--------------|-------------------------------|
| Frontend     | React 18                      |
| Build Tool   | Vite 5                        |
| Styling      | Pure CSS (CSS Custom Properties) |
| Fonts        | Syne + Jost (Google Fonts)    |
| State Mgmt   | React Hooks (useState, useEffect, useCallback) |
| Persistence  | localStorage (mock backend)   |
| Data Source  | mockData.js (seed data)       |

---

## 🔄 Application Flow

### 1. Login / Register
```
Landing Page
  ├── Quick-select demo user → instant login
  ├── Sign In (email + password)
  └── Register (name, email, password, role)
        └── Role-based redirect:
              ├── Student  → Student Course Dashboard
              └── Professor → Professor Course Dashboard
```

### 2. Professor Flow
```
Professor Course Dashboard
  └── Click a Course
        └── Course Assignments Page
              ├── Analytics strip (submissions, groups, completion %)
              ├── Create Assignment (title, desc, deadline, Drive link, type)
              ├── Edit / Delete Assignment
              ├── Filter: All / Individual / Group / Complete / Incomplete
              ├── Search by title
              └── Per-assignment progress bar
                    ├── Individual → per-student status + timestamp
                    └── Group → per-group status + timestamp
```

### 3. Student Flow
```
Student Course Dashboard
  └── Click a Course
        └── Course Assignments Page
              ├── Group status bar (join/create/manage group)
              ├── Filter: All / Pending / Submitted / Overdue
              ├── Search by title
              └── Per-assignment card
                    ├── Individual → Submit button → 2-step confirmation
                    └── Group → Leader submits → all members marked
```

---

## 🔁 Data Flow

```
mockData.js (seed)
    ↓
localStorage (persisted state)
    ↓
App.jsx (loads + manages all state)
    ↓
Props passed to child components
    ↓
User action (submit / create / join)
    ↓
State update in App.jsx
    ↓
localStorage saved
    ↓
React re-renders UI
```

---

## 🧠 Key Components

| Component | Responsibility |
|-----------|---------------|
| `App.jsx` | Root state owner — users, courses, assignments, groups. View routing via `{ page, courseId }` state |
| `LoginPage.jsx` | Login form, register form with validation, role-based quick-select |
| `Navbar.jsx` | Sticky navigation with dynamic breadcrumb trail per route |
| `StudentCourseDashboard.jsx` | Enrolled courses grid, overall progress ring, stat cards |
| `StudentAssignmentsPage.jsx` | Assignment cards, group status bar, search/filter, submit trigger |
| `AdminCourseDashboard.jsx` | Taught courses grid, class completion %, create course modal |
| `AdminAssignmentsPage.jsx` | Analytics strip, assignment list, progress bars, per-student detail |
| `CreateAssignmentModal.jsx` | Create + edit mode form — title, description, deadline, Drive link, type |
| `SubmitModal.jsx` | Step 1: "Yes I submitted" → Step 2: final confirm with group awareness |
| `GroupModal.jsx` | List existing groups, join a group, create new group, leave group |
| `Toast.jsx` | Auto-dismiss notifications at 3.5s — success, error, info types |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or above — [Download here](https://nodejs.org)

### 1. Clone / Extract
```bash
# If cloning:
git clone <your-repo-url>
cd joineazy

# If using the zip:
unzip joineazy-dashboard-task2.zip
cd joineazy
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Open in Browser
```
http://localhost:5173
```

### 5. Build for Production
```bash
npm run build
# Output in dist/ folder — deploy to Netlify or Vercel
```

**Netlify:** Drag and drop the `dist/` folder at [netlify.com/drop](https://netlify.com/drop)

**Vercel:**
```bash
npm i -g vercel
vercel
```

---

## 🔑 Demo Credentials

| Role      | Email                     | Password   |
|-----------|---------------------------|------------|
| Student   | aisha@student.edu         | student123 |
| Student   | rohan@student.edu         | student123 |
| Student   | priya@student.edu         | student123 |
| Student   | karan@student.edu         | student123 |
| Professor | anjali@university.edu     | prof123    |
| Professor | suresh@university.edu     | prof123    |

> **Tip:** Use the quick-select buttons on the login page to log in instantly without typing credentials.

---

## 📊 Mock Data Included

| Entity      | Count | Details |
|-------------|-------|---------|
| Students    | 4     | Pre-enrolled in courses |
| Professors  | 2     | Each teaches 2 courses |
| Courses     | 4     | CS301, MA201, CS302, CS401 |
| Assignments | 6     | Mix of Individual + Group types |
| Groups      | 3     | Across CS301 and CS302 |

---

## 📈 Future Enhancements

- 🔗 Backend integration (Node.js + Express + MongoDB)
- 🔐 Real JWT authentication with refresh tokens
- 📁 Actual file upload to OneDrive / Google Drive API
- 📊 Full analytics dashboard with charts (Chart.js / Recharts)
- 📬 Email notifications on assignment creation / deadline reminder
- 🌐 Deployed live demo (Vercel + CI/CD)
- 🔔 Real-time updates via WebSockets

---

## 🧩 Design Philosophy

- **Component-based architecture** — each component has a single responsibility
- **Pure CSS over frameworks** — full control, no Tailwind, uses CSS custom properties throughout
- **Dark luxury aesthetic** — deep navy base (`#05070f`), electric blue (`#5b8fff`), mint (`#00ddb3`)
- **Typography** — Syne (700–800 weight) for headings, Jost (300–600) for body text
- **Motion** — purposeful animations only: card entrance stagger, spring modals, blob float
- **Mobile-first responsive** — single column on mobile, expands to full grid on desktop
- **Accessibility** — keyboard navigable modals, sufficient colour contrast, focus states

---

## 👨‍💻 Author

Developed as part of the **Joineazy Frontend Intern.

---

> *"Design is not just what it looks like and feels like. Design is how it works."* — Steve Jobs
