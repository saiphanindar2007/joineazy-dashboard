# 🚀 Joineazy — Assignment & Review Dashboard

A modern, responsive, role-based assignment management system built using React and Vite.
This project simulates a real-world student–professor workflow with submission tracking, progress visualization, and clean UX.

---

# 🎯 Project Objective

To build a **role-based dashboard** where:

* 👨‍🎓 Students can view assignments and submit them with a confirmation flow
* 👨‍🏫 Admins can create assignments and monitor student progress
* 📊 Both roles interact through a clean, responsive interface

---

# ⚙️ Project Setup Instructions

## 🔧 Prerequisites

* Node.js (v18 or above)
* npm (comes with Node.js)

---

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/joineazy-dashboard.git
cd joineazy-dashboard
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Run Development Server

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 🏗 Build for Production

```bash
npm run build
npm run preview
```

---

# 🧱 Architecture Overview

## 🔹 Application Type

* Single Page Application (SPA)
* No external routing library
* Role-based conditional rendering

---

## 🔹 State Management

* Centralized in `App.jsx`
* Uses React hooks:

  * `useState`
  * `useEffect`
* Global state includes:

  * `currentUser`
  * `assignments`

---

## 🔹 Data Persistence

* No backend used
* Data stored in **localStorage**
* Ensures persistence across page reloads

---

## 🔹 Data Flow

1. Load data from localStorage
2. If empty → initialize from `mockData.js`
3. Update state on user actions
4. Sync updated data back to localStorage

---

# 🧠 Application Logic Explained

## 🔹 Assignment Structure

```js
{
  id,
  title,
  description,
  dueDate,
  driveLink,
  submissions: [studentId]
}
```

---

## 🔹 Role-Based Rendering

```js
currentUser.role === "student"
  ? <StudentDashboard />
  : <AdminDashboard />
```

* Students see only their submissions
* Admin sees all student statuses

---

## 🔹 Student Dashboard Logic

### Features:

* View assignments
* Submit assignments
* Track progress

---

### 🔹 Submission Logic (Key Feature)

* Uses **double confirmation flow**:

  1. "Have you submitted?"
  2. "Final confirmation?"

After confirmation:

* Student ID added to `submissions`
* State updated
* localStorage updated

---

### 🔹 Status Logic

```js
const submitted = assignment.submissions.includes(studentId);
```

* True → Submitted
* False → Pending

---

### 🔹 Progress Calculation (Student)

```js
progress = (submittedAssignments / totalAssignments) * 100;
```

---

## 🔹 Admin Dashboard Logic

### Features:

* Create assignments
* Delete assignments
* View submission status
* Monitor progress

---

### 🔹 Create Assignment

* Form input → validated
* New assignment object created
* Added to state
* Stored in localStorage

---

### 🔹 Delete Assignment

* Remove assignment by ID
* Update state and storage

---

### 🔹 Progress Calculation (Admin)

```js
progress = (submittedStudents / totalStudents) * 100;
```

---

## 🔹 Modal Logic

* `SubmitModal` → handles submission confirmation
* `CreateAssignmentModal` → handles form input + validation

---

## 🔹 Toast Notifications

* Triggered on:

  * Submission
  * Creation
  * Deletion
* Auto-dismiss after few seconds

---

# 📁 Folder Structure Overview

```
joineazy-dashboard/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── data/
    │   └── mockData.js
    └── components/
        ├── LoginPage.jsx
        ├── Navbar.jsx
        ├── StudentDashboard.jsx
        ├── AdminDashboard.jsx
        ├── SubmitModal.jsx
        ├── CreateAssignmentModal.jsx
        └── Toast.jsx
```

---

# 🧩 Component Structure & Responsibilities

| Component               | Responsibility                       |
| ----------------------- | ------------------------------------ |
| `App.jsx`               | Root component, manages global state |
| `LoginPage`             | Role selection and entry point       |
| `Navbar`                | Navigation and user actions          |
| `StudentDashboard`      | Assignment display and submission    |
| `AdminDashboard`        | Assignment management and tracking   |
| `SubmitModal`           | Double-confirmation submission       |
| `CreateAssignmentModal` | Assignment creation form             |
| `Toast`                 | Notification system                  |

---

# 💡 Design Decisions

### 🔹 1. No Backend (Simulation)

* Used localStorage to simulate backend behavior
* Keeps system simple and functional

---

### 🔹 2. Component-Based Architecture

* Improves maintainability and scalability
* Clear separation of concerns

---

### 🔹 3. Minimal State Management

* Avoided Redux/Context for simplicity
* Suitable for this scale

---

### 🔹 4. UX-Focused Design

* Double confirmation prevents mistakes
* Clear status indicators
* Visual progress tracking

---

### 🔹 5. Pure CSS (No Tailwind)

* Full control over styling
* Lightweight and customizable

---

# 🎨 UI & Design

* Dark-themed modern dashboard
* Smooth animations and transitions
* Clean card-based layout
* Responsive design

---

# 📱 Responsiveness

* Mobile-first design
* Works across:

  * Mobile
  * Tablet
  * Desktop

---

# 🛠 Tech Stack

* React 18
* Vite 5
* HTML, CSS (No Tailwind)
* localStorage

---

# 🌐 Deployment

Deploy using platforms like:

* Vercel
* Netlify

### Build Settings:

```
Build Command: npm run build
Output Folder: dist
```

---

# 🚀 Future Improvements

* Backend integration (Node.js / Firebase)
* Authentication system
* Multi-user real-time updates
* Notifications and reminders

---

# 🧪 Evaluation Highlights

✔ Clean architecture
✔ Role-based functionality
✔ Real-world UX flow
✔ Scalable structure
✔ Responsive UI

---

# 👨‍💻 Author

Developed as part of Joineazy Frontend Intern Task.

---

# 🎯 Final Note

This project demonstrates:

> Strong frontend fundamentals, structured architecture, and user-focused design.

---
