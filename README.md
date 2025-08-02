# 🚲 Bicycle Store API

A full-featured **Bicycle Store API** built with **TypeScript**, **Express.js**, and **MongoDB** (via **Mongoose**). Designed for efficient **product management**, **order processing**, **inventory control**, **revenue tracking**, and now includes **payment integration using Stripe**.

---

## 🔥 Features

- 🚴‍♂️ **Product Management**
  - Create, read, update, and delete bicycles
  - Advanced search and filtering by `name`, `brand`, `type`, and `productId`

- 🛒 **Order Management**
  - Place bicycle orders
  - Automatic inventory adjustment
  - Real-time revenue calculation with MongoDB aggregation

- 💳 **Stripe Payment Integration**
  - Secure checkout and payment handling
  - Order confirmation after successful payment

- 👥 **User Authentication & Authorization**
  - Role-based access (`admin`, `customer`)
  - JWT-based authentication
  - Admin-only product and order control

- 📦 **Inventory Control**
  - Stock validation before order
  - Auto-decrement after successful purchase

- 📈 **Analytics**
  - Revenue reports
  - Most sold bicycles and popular brands

- 🌐 **RESTful API**
  - Clean and scalable API structure

---

## 🧰 Tech Stack

- **Backend**: `Express.js` + `TypeScript`
- **Database**: `MongoDB` + `Mongoose`
- **Authentication**: `JWT` (JSON Web Tokens)
- **Payment Gateway**: `Stripe`
- **Environment Management**: `dotenv`
- **Error Handling**: Custom Global Error Handler Middleware

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js >= 18.x
- MongoDB instance (cloud or local)
- Stripe account

### 🔧 Installation

```bash
git clone https://github.com/rana5699/assignment-2.git
cd bicycle-store
npm install
