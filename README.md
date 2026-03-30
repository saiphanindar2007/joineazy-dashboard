# Joineazy — Assignment & Review Dashboard

A clean, responsive, role-based assignment management system built for Joineazy's Frontend Intern Task.

## 🚀 Quick Setup

### Prerequisites
- Node.js v18+ installed ([download here](https://nodejs.org))
- Terminal / Command Prompt

### Step 1 — Create the project folder and install

```bash
# Create and enter project directory
mkdir joineazy-dashboard && cd joineazy-dashboard

# Copy all provided files into this folder (see folder structure below)
# Then run:
npm install
```

### Step 2 — Run Development Server

```bash
npm run dev
```

Open **http://localhost:5173** in your browser. Done! 🎉

### Step 3 — Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## 📁 Folder Structure

```
joineazy-dashboard/
├── index.html               # Entry HTML with Google Fonts
├── package.json             # Dependencies
├── vite.config.js           # Vite config
├── README.md
└── src/
    ├── main.jsx             # React root mount
    ├── App.jsx              # Root component — state + routing
    ├── App.css              # All global styles (no Tailwind)
    ├── data/
    │   └── mockData.js      # Mock students, admins, assignments
    └── components/
        ├── LoginPage.jsx        # Landing + role selection
        ├── Navbar.jsx           # Shared sticky navbar
        ├── StudentDashboard.jsx # Student view + assignment cards
        ├── AdminDashboard.jsx   # Admin view + progress bars
        ├── SubmitModal.jsx      # 2-step submission confirmation
        ├── CreateAssignmentModal.jsx  # Admin create assignment form
        └── Toast.jsx            # Toast notification system
```

---

## 🏗 Architecture Overview

### State Management
- **App.jsx** owns all global state (`currentUser`, `assignments`)
- Data persists across refreshes via **localStorage**
- Props drilling used (no Context/Redux needed at this scale)

### Routing
- Single-page: App conditionally renders `<LoginPage>`, `<StudentDashboard>`, or `<AdminDashboard>` based on `currentUser`

### Data Layer
- No backend — `mockData.js` seeds initial data to `localStorage`
- `assignments` array holds submission state: each assignment has a `submissions: [studentId]` array

### Component Design Decisions
| Component | Responsibility |
|-----------|---------------|
| `LoginPage` | Hero landing, role/user selection |
| `Navbar` | Sticky nav with tab switching, user badge, logout |
| `StudentDashboard` | Grid of assignment cards, stats, circular progress |
| `AssignmentCard` (inside Student) | Individual card with submit button |
| `AdminDashboard` | List of assignments with per-student progress bars |
| `AdminAssignmentCard` (inside Admin) | Card + expandable student list |
| `SubmitModal` | 2-step double-verification flow |
| `CreateAssignmentModal` | Form with validation for new assignments |
| `Toast` | Auto-dismissing notifications (3.5s) |

---

## ✨ Features

### Student View
- 📋 View all assignments with subject, description, due date
- 🔗 Open Google Drive submission link per assignment
- ✅ **Double-verification submission flow** (Step 1 → Step 2 confirmation)
- 📊 Circular overall progress indicator
- 🏷 Status badges: Submitted / Pending / Overdue
- 🔍 Filter by All / Pending / Submitted (nav tabs)

### Admin (Professor) View
- ➕ Create assignments (title, subject, due date, description, Drive link)
- 📊 Per-assignment **progress bar** showing class submission rate
- 👥 Expandable per-student status list (Submitted / Pending)
- 🗑 Delete own assignments
- 📈 Overall stats: completion rate, total submissions
- 🔀 Toggle between "My Assignments" and "All Assignments"

### Design
- 🌑 Dark luxury aesthetic — deep navy/black with electric blue + mint accents
- 🔤 Fonts: **Syne** (display/headings) + **Jost** (body)
- 💫 CSS animations — card entrances, blob backgrounds, loader, modals
- 📱 Fully responsive — mobile, tablet, desktop
- 🎨 Pure CSS (no Tailwind) with CSS custom properties
- 🍞 Toast notification system

---

## 🛠 Tech Stack
- **React 18** — UI library
- **Vite 5** — build tool & dev server
- **Pure CSS** — custom properties, no CSS frameworks
- **localStorage** — data persistence
- **Google Fonts** — Syne + Jost

---

## 🌐 Deploy to Vercel/Netlify

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm run build
# Drag and drop the `dist/` folder to netlify.com/drop
```

Build output: `dist/` folder
Build command: `npm run build`
Publish directory: `dist`
