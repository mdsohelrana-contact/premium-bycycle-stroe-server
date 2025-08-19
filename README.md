# Bicycle Store API

=====================

A full-featured **Bicycle Store API** built with **TypeScript**, **Express.js**, and **MongoDB** (via **Mongoose**). Designed for efficient **product management**, **order processing**, **inventory control**, **revenue tracking**, and now includes **payment integration using Stripe**.

## 🔗 Front End Repository Link

You can find the front-end source code here:  
[👉 Click to view Frontend Repo](https://github.com/mdsohelrana-contact/premium-bicycle-store-client-)

## Table of Contents

---

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Folder Structure](#folder-structure)
- [Scripts](#scripts)
- [Deployment Guide](#deployment-guide)
- [License](#license)

## Features

---

- **Product Management**
  - Create, read, update, and delete bicycles
  - Advanced search and filtering by `name`, `brand`, `type`, and `productId`
- **Order Management**
  - Place bicycle orders
  - Automatic inventory adjustment
  - Real-time revenue calculation with MongoDB aggregation
- **Stripe Payment Integration**
  - Secure checkout and payment handling
  - Order confirmation after successful payment
- **User Authentication & Authorization**
  - Role-based access (`admin`, `customer`)
  - JWT-based authentication
  - Admin-only product and order control
- **Inventory Control**
  - Stock validation before order
  - Auto-decrement after successful purchase
- **Analytics**
  - Revenue reports
  - Most sold bicycles and popular brands
- **RESTful API**
  - Clean and scalable API structure

## Tech Stack

---

- **Backend**: `Express.js` + `TypeScript`
- **Database**: `MongoDB` + `Mongoose`
- **Authentication**: `JWT` (JSON Web Tokens)
- **Payment Gateway**: `Stripe`
- **Environment Management**: `dotenv`
- **Error Handling**: Custom Global Error Handler Middleware

## Setup Instructions

---

### Prerequisites

- Node.js (>= 14.17.0)
- MongoDB (>= 4.4.3)
- Stripe account for payment integration

### Installation

1. Clone the repository: `git clone https://github.com/your-username/your-repo-name.git`
2. Install dependencies: `npm install` or `yarn install`
3. Create a `.env` file in the root directory and add the following environment variables:
   - `MONGO_URI`: MongoDB connection string
   - `STRIPE_SECRET_KEY`: Stripe secret key
   - `STRIPE_PUBLIC_KEY`: Stripe public key
4. Start the backend server: `npm run server` or `yarn server`

## Folder Structure

---

- `src`: Source code
- [src/modules](cci:7://file:///e:/RANA/Projects/Level-2/BackEnd/Assignments/Assignment-2/src/modules:0:0-0:0): Feature modules (e.g. `products`, `orders`, `users`)
- [src/utils](cci:7://file:///e:/RANA/Projects/Level-2/BackEnd/Assignments/Assignment-2/src/utils:0:0-0:0): Utility functions
- [src/middlewares](cci:7://file:///e:/RANA/Projects/Level-2/BackEnd/Assignments/Assignment-2/src/middlewares:0:0-0:0): Middleware functions
- [src/errors](cci:7://file:///e:/RANA/Projects/Level-2/BackEnd/Assignments/Assignment-2/src/errors:0:0-0:0): Error handling
- `public`: Static assets (images, fonts, etc.)

## Scripts

---

- `npm run server`: Starts the backend server
- `npm run dev`: Starts the backend server in development mode
- `npm run build`: Builds the TypeScript code
- `npm run deploy`: Deploys the application to a production environment

## Deployment Guide

---

### Production Environment

1. Create a new MongoDB cluster and add the connection string to the `.env` file
2. Create a new Stripe account and add the secret and public keys to the `.env` file
3. Build the TypeScript code: `npm run build`
4. Deploy the application to a production environment (e.g. Heroku, AWS, etc.)

### Development Environment

1. Start the backend server: `npm run server`
2. Access the API at `http://localhost:3000`

## License

---

This project is licensed under the MIT License. See the [LICENSE file](LICENSE) for details.

