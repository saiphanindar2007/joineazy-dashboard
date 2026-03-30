# 🚀 Joineazy — Assignment & Review Dashboard

A modern, responsive **role-based assignment management system** built as part of the Joineazy Frontend Intern Task.
Designed with a focus on **clean UX, scalability, and real-world usability**.

---

## 🎯 Project Objective

To build a **student-assignment dashboard** with:

* Role-based access (Student / Admin)
* Assignment tracking & submission system
* Visual progress indicators
* Clean and responsive UI

---

## ⚡ Live Features

### 👨‍🎓 Student Dashboard

* View all assigned tasks with details
* Access Google Drive submission links
* Submit assignments via **2-step verification flow**
* Track progress with **circular progress indicator**
* Status indicators:

  * ✅ Submitted
  * ⏳ Pending
  * ⚠️ Overdue
* Filter assignments (All / Pending / Submitted)

---

### 👨‍🏫 Admin Dashboard

* Create new assignments with validation
* Monitor submissions using **progress bars**
* View per-student submission status
* Delete assignments
* Track:

  * Total submissions
  * Completion rate
* Toggle between:

  * My Assignments
  * All Assignments

---

## 🧠 Core Logic & Implementation

### 🔹 State Management

* Centralized in `App.jsx`
* Handles:

  * `currentUser`
  * `assignments`
* Data persistence via **localStorage**

---

### 🔹 Data Flow

* Initial data seeded from `mockData.js`
* Stored in localStorage for persistence
* Structure:

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

### 🔹 Role-Based Rendering

* Single-page architecture
* Conditional rendering:

```js
currentUser.role === "student"
  ? <StudentDashboard />
  : <AdminDashboard />
```

---

### 🔹 Submission Logic (Key Highlight)

* Double confirmation flow:

  1. Initial confirmation
  2. Final verification
* Prevents accidental submissions
* Updates state + localStorage instantly

---

### 🔹 Progress Calculation

* Student:

  * Completed / Total assignments → circular progress
* Admin:

  * Submitted students / total students → progress bar

---

## 🏗 Architecture Overview

```
src/
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

## 🎨 UI & Design Philosophy

* Dark-themed **modern SaaS dashboard**
* Color palette:

  * Deep navy / black
  * Electric blue accents
  * Mint highlights
* Typography:

  * **Syne** → headings
  * **Jost** → body
* Micro-interactions:

  * Card hover animations
  * Modal transitions
  * Toast notifications

---

## 📱 Responsiveness

* Fully responsive across:

  * Mobile
  * Tablet
  * Desktop
* Flexible layouts using CSS

---

## 🛠 Tech Stack

* **React 18** — Component-based UI
* **Vite 5** — Fast build tool
* **Pure CSS** — No frameworks
* **localStorage** — Data persistence
* **Google Fonts** — Typography

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Run Development Server

```bash
npm run dev
```

Visit:

```
http://localhost:5173
```

---

### 3️⃣ Production Build

```bash
npm run build
npm run preview
```

---

## 🌐 Deployment

### Vercel / Netlify

* Build Command:

```
npm run build
```

* Output Directory:

```
dist
```

---

## 💡 Design Decisions

* Avoided external state libraries → kept lightweight
* Used localStorage → simulate backend behavior
* Component-based structure → easy scalability
* Focused on UX clarity → minimal confusion for users

---

## 🚀 Future Improvements

* Backend integration (Node.js / Firebase)
* Authentication system
* Multi-user real-time tracking
* Notifications & reminders
* Analytics dashboard

---

## 🧪 Evaluation Highlights

✔ Clean architecture
✔ Role-based functionality
✔ Real-world UX flows
✔ Scalable structure
✔ Responsive design

---

## 👨‍💻 Author

Developed as part of Joineazy Frontend Task submission.

---

## 🎯 Final Note

This project demonstrates:

> Strong frontend fundamentals, clean UI design, and practical system thinking.

---
