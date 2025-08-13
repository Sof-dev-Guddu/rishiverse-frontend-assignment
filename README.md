# Rishiverse Frontend Developer Assignment

## Project Overview
This is a **Next.js (TypeScript)** application developed for the Rishiverse Frontend Developer Coding Challenge. It implements a mock authentication system, a student dashboard, and CRUD operations with a clean, responsive UI. The application uses **shadcn/ui**, **Tailwind CSS**, **Redux Toolkit**, and **React Hook Form with Zod** for form handling and validation.

---

## Tech Stack
- **Frontend:** Next.js, TypeScript, Tailwind CSS, shadcn/ui  
- **State Management:** Redux Toolkit with async thunks  
- **Form Handling & Validation:** React Hook Form + Zod  
- **Backend/Mock API:** Next.js API routes (mock API as database)  
- **Authentication:** JWT token with `isAdmin` flag stored in `localStorage`

---

## Features

### Authentication
- Simple login/signup flow using Next.js API routes  
- JWT token returned with user info (`isAdmin` flag, name, etc.)  
- Tokens stored in `localStorage` and synced with Redux slice  
- Admin and regular user differentiation  

### Dashboard & Data Display
- `/dashboard/students` page shows a list of student cards  
- Admin users can perform **CRUD operations** on students  
- Regular users can **view student cards only**  
- Dynamic student page `/dashboard/students/[id]` displays full details when a card is clicked  
- Features include **pagination, infinite scroll, sorting, and filtering**  

### State & Network Management
- **Network layer intercepts JWT token** and synchronizes with Redux slices  
- Separate slices and async thunks for **authentication** and **student CRUD operations**  
- Handles loading states and error messages for API calls  

### UI & Responsiveness
- Collapsible sidebar using **shadcn/ui**  
  - Dummy menu with **Students** (dashboard) and **Logout**  
- Fully responsive for **desktop, tablet, and mobile**  
- Clean, modern UI design using Tailwind CSS  

---

## Setup Instructions

1. Clone the repository:
```bash
git clone <repo-link>
npm install
npm run dev

## Demo Accounts

| Role  | Email             | Password  |
|-------|-----------------|-----------|
| Admin | ck@gmail.com   | jjsetpu |
| User  | user@test.com     | user123  |