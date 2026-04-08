# 🩸 Blood Bank Management System (BBMS) — Backend

A **Blood Bank Management System (BBMS)** backend built using the **PERN stack** (PostgreSQL, Express.js, React, Node.js).  
This system manages blood donations, blood inventory, and blood requests with a **role-based access control system** for Admin, Staff, and Donor.

The project follows **industry-level backend architecture** with Prisma ORM and PostgreSQL.

---

# 🚀 Features

## 👤 Role-Based Access Control (RBAC)

### **Admin**
- Manage users
- Manage blood inventory
- Approve/reject blood requests
- Monitor system

### **Staff**
- Blood testing
- Handle blood requests
- Update donation status
- Positions: Doctor, Lab Technician and Nurse

### **Donor**
- Register/login
- Donate blood
- View donation history

---

## 🩸 Blood Donation Management

- Donor blood submission
- Blood testing workflow
- Donation approval/rejection
- Donation history tracking

---

## 🏥 Blood Inventory Management

- Track available blood by group
- Update inventory after donation
- Reduce stock after request approval

---

## 📦 Blood Request System

- Request blood for hospital/patient
- Request approval workflow
- Status tracking (Pending, Approved, Rejected, Completed)

---

## 🔔 Notification System

- User notifications
- Request status updates
- Donation updates

---

# 🏗️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **ORM:** Prisma  
- **Authentication:** JWT  
- **Architecture:** REST API  
- **Pattern:** Role-Based Access Control (RBAC)
- **Neon** 

---

# 🗄️ Database Design

The system follows a normalized relational database structure.

## Main Entities

- User
- Donation
- BloodRequest
- BloodInventory
- BloodTestReport
- Notification

---

# 📊 Database Schema Overview

## Enums

- Role → ADMIN, STAFF, DONOR
- Position → DOCTOR, LAB_TECHNICIAN, NURSE.
- BloodGroup → A_POS, B_POS, O_POS, etc.
- RequestStatus → PENDING, APPROVED, REJECTED, COMPLETED
- DonationStatus → PENDING, APPROVED, REJECTED, COMPLETED

---

## Core Models

### **User**
- Stores admin, staff, and donor information.

### **Donation**
- Tracks donor blood donations.

### **BloodInventory**
- Stores available blood stock.

### **BloodRequest**
- Handles blood requests.

### **BloodTestReport**
- Stores test results for donated blood.

### **Notification**
- Stores system notifications.

---
---

# ⚙️ Installation & Setup

## 1. Clone Repository

```
git clone https://github.com/rupeshchy10/BBMS_api_using_PERN_and_Prisma.git
```

---

## 2. Install Dependencies

```
npm install
```

---

## 3. Setup Environment Variables

Create a `.env` file:

```
DATABASE_URL="postgresql://user:password@localhost:5432/bbms"
JWT_SECRET=your_secret_key
```

---

## 4. Run Prisma Migration

```
npx prisma migrate dev
```

---

## 5. Generate Prisma Client

```
npx prisma generate
```

---

## 6. Start Server

```
npm run dev
```

---

# 🔐 Future Improvements

- JWT authentication & refresh tokens
- Permission-based authorization
- Blood expiry tracking
- Appointment booking system
- Hospital management module
- Audit logging
- API documentation (Swagger)
- Docker deployment

---

# 🎯 Learning Goals

This project demonstrates:

- Database design
- Backend architecture
- REST API development
- Role-based access control
- Prisma ORM usage
- Production-level schema design

---

# 👨‍💻 Author

Rupesh Choudhary  
Computer Engineering Student — Backend Developer
* 💼 Portfolio: *https://portfolio-using-react-and-tailwind-orcin.vercel.app/*
* 🐙 GitHub: *https://github.com/rupeshchy10*
