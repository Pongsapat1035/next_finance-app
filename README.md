# 💰 next-finance-tracker-app

A full-stack finance tracker built with **Next.js**, **Firebase**, and **Material UI** to manage your income and expenses, visualize data with charts, and set financial goals. This project showcases modern web development with SSR, Firebase Authentication, and server components.

## 🔗 Live Demo

🌐 [View on Vercel](https://next-finance-app-phi.vercel.app/)

## 🛠 Tech Stack

- **Framework**: Next.js (App Router, Server Components, SSR)
- **Backend & Auth**: Firebase (Authentication, Firestore, Firebase Admin SDK)
- **UI**: Material UI (MUI)
- **Deployment**: Vercel

## 🔐 Features

### 🔒 Authentication
- Email/password authentication with input validation
- Google Sign-in supported
- Session stored in secure HTTP-only cookies
- Route protection with Firebase Admin token validation using Next.js middleware

### 📊 Dashboard
- View all your transactions
- Total boxes for **Income** and **Expenditure**
- CRUD (Create, Read, Update, Delete) transactions
- Pie chart showing expense breakdown
- Monthly spending progress with **Spending Limit Box**
- Default to current month, switch to other months via dropdown

### 📈 Report Page
- Overview of total income and expense
- Bar chart for daily spend/income
- Category-wise most spent (with percentages)
- Month selector support

### ⚙️ Settings
- Set your own monthly **Spending Limit**
- Manage categories for income and expense

### 📱 Responsive Design
- Fully responsive and mobile-friendly

## 🧠 What I Learned

- Using Next.js App Router and Server Components
- Implementing Firebase Admin SDK for token validation
- Building protected routes with `middleware.ts`
- Integrating MUI for professional UI/UX
- Creating interactive charts with dynamic data
- Managing state with full-stack Firebase integration
