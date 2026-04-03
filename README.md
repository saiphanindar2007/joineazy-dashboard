# 🚀 JoinEazy Dashboard

A modern, role-based dashboard system designed for managing courses, assignments, and student interactions in an intuitive and visually appealing interface.

---

## 📌 Overview

**JoinEazy Dashboard** is a frontend-focused web application built using modern technologies to simulate a real-world course and assignment management system. It supports two primary roles:

* 👨‍🏫 **Admin (Instructor)**
* 👨‍🎓 **Student**

Each role has dedicated dashboards, workflows, and functionalities to manage and interact with course content efficiently.

---

## ✨ Features

### 🔐 Authentication

* Simple login system (mock-based)
* Role-based redirection (Admin / Student)

### 👨‍🏫 Admin Functionalities

* Create and manage assignments
* View all assignments
* Manage student submissions
* Create student groups
* Dashboard overview of courses

### 👨‍🎓 Student Functionalities

* View assigned tasks
* Submit assignments
* Join groups
* Track submission status
* Course dashboard view

### 🎨 UI/UX Highlights

* Clean and modern layout
* Modular component structure
* Interactive modals (Create, Submit, Group)
* Toast notifications for feedback
* Responsive design

---

## 🏗️ Project Architecture

```
joineazy/
│
├── src/
│   ├── components/
│   │   ├── AdminCourseDashboard.jsx
│   │   ├── StudentCourseDashboard.jsx
│   │   ├── AdminAssignmentsPage.jsx
│   │   ├── StudentAssignmentsPage.jsx
│   │   ├── CreateAssignmentModal.jsx
│   │   ├── SubmitModal.jsx
│   │   ├── GroupModal.jsx
│   │   ├── LoginPage.jsx
│   │   ├── Navbar.jsx
│   │   └── Toast.jsx
│   │
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Tech Stack

| Layer       | Technology     |
| ----------- | -------------- |
| Frontend    | React.js       |
| Build Tool  | Vite           |
| Styling     | CSS            |
| State Mgmt  | React Hooks    |
| Data Source | Mock Data (JS) |

---

## 🔄 Application Flow

### 1. Login Flow

* User enters credentials
* Role is determined from mock data
* Redirect to:

  * Admin Dashboard
  * Student Dashboard

---

### 2. Admin Flow

```
Login → Admin Dashboard → Assignments Page
       → Create Assignment → Notify Students
       → View Submissions → Manage Groups
```

---

### 3. Student Flow

```
Login → Student Dashboard → View Assignments
       → Submit Assignment → Join Group
       → Track Submission Status
```

---

## 🔁 Data Flow

Since this is a frontend simulation, data is handled locally via `mockData.js`.

### Flow Structure:

1. **Mock Data Source**

   * Users
   * Courses
   * Assignments
   * Submissions

2. **Component Interaction**

   * Data passed via props
   * State managed using `useState`

3. **User Actions**

   * Create / Submit / Join → Updates local state

4. **UI Update**

   * React re-renders components dynamically

---

## 🧠 Key Components Explained

### 🔹 `App.jsx`

* Root component
* Handles routing logic and role-based rendering

### 🔹 `LoginPage.jsx`

* Handles authentication logic
* Determines user role

### 🔹 `AdminAssignmentsPage.jsx`

* Displays all assignments
* Allows creation and management

### 🔹 `StudentAssignmentsPage.jsx`

* Displays assigned tasks
* Handles submission flow

### 🔹 `CreateAssignmentModal.jsx`

* Form to create new assignments

### 🔹 `SubmitModal.jsx`

* Students submit their work here

### 🔹 `GroupModal.jsx`

* Group creation/joining interface

### 🔹 `Toast.jsx`

* Displays success/error notifications

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd joineazy
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Project

```bash
npm run dev
```

### 4. Open in Browser

```
http://localhost:5173
```

---

## 🔑 Sample Credentials (Mock)

| Role    | Username | Password |
| ------- | -------- | -------- |
| Admin   | admin    | 1234     |
| Student | student  | 1234     |

---

## 📈 Future Enhancements

* 🔗 Backend Integration (Node.js + MongoDB)
* 🔐 Real Authentication (JWT)
* 📊 Analytics Dashboard
* 📁 File Upload Support
* 📬 Email Notifications
* 🌐 Deployment (Vercel / Netlify)

---

## 🧩 Design Philosophy

* **Modular Components**
* **Reusable UI Elements**
* **Separation of Concerns**
* **Scalable Architecture**
* **Clean Code Practices**

---

## 🤝 Contribution

Contributions are welcome! Feel free to fork the repo and submit pull requests.

---

## 📜 License

This project is for educational purposes and can be freely used and modified.

---

## 👨‍💻 Author

**Developed as part of Joineazy Frontend Intern.**

---

> “Design is not just what it looks like and feels like. Design is how it works.” – Steve Jobs

---
