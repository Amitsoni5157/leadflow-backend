# 🚀 LeadFlow CRM (Full Stack Project)

A simple yet powerful Lead Management CRM built with Node.js, Express, MongoDB, and JWT Authentication.

## 🔥 Features

- 👤 User Authentication (Login/Register with JWT)
- 🧑‍💼 Role-Based Access (Admin & Agent)
- 📥 Lead Management System
- ➕ Add New Leads
- 📋 View Leads (Admin → All, Agent → Own Leads)
- 🔄 Follow-up Tracking System
- 🌐 Public Lead Capture API (Website Integration)
- 📲 WhatsApp Notification Integration

---

## 🛠️ Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Authentication: JWT
- Deployment: Render
- API Testing: Postman

---

## 🔐 Authentication Flow

- User logs in with email & password
- Server returns JWT token
- Token used for protected routes
- Role-based data filtering applied
