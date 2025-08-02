# Bicycle Store Application API

A Bicycle Store application built with **TypeScript** , **Express.js** , and **MongoDB** with **Mongoose**. The app includes special features for **product management** , **order processing** , **inventory control** , and **revenue tracking**.

---

## Features !!

- Add, Get, update, and delete bicycles.
- View all bicycles with search and filtering **name** , **brand** and **type** and **specific ID**.
- Place orders with inventory management logic.
- Calculate total revenue from orders using MongoDB aggregation.

---

### `Technologies` Used

- Backend : `Express.js` with `TypeScript`
- Database : `MongoDB` with `Mongoose`
- Error Handling : Fllow globals errorHandle model
- Environment Variables : Managed with `dotenv`

## Run Locally

Clone the project

```bash
  git clone https://github.com/rana5699/assignment-2.git
```

Go to the project directory

```bash
 cd bicycle-store

```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

`PORT`

`DATABASEURL`

`NODE_ENV`

## API Reference

# Bicycles

#### Create a Bicycle (POST)

```http
   /api/products
```

#### Get All Bicycles (GET)

```http
   /api/products
```

#### Get a Specific Bicycle (GET)

```http
   /api/products/:productId
```

| Parameter   | Type     | Description                       |
| :---------- | :------- | :-------------------------------- |
| `productId` | `string` | **Required**. Id of item to fetch |

#### Update a Bicycle (PUT)

```http
   /api/products/:productId
```

| Parameter   | Type     | Description                       |
| :---------- | :------- | :-------------------------------- |
| `productId` | `string` | **Required**. Id of item to fetch |

#### Delete a Bicycle (DELETE)

```http
   /api/products/:productId
```

| Parameter   | Type     | Description                       |
| :---------- | :------- | :-------------------------------- |
| `productId` | `string` | **Required**. Id of item to fetch |

## Orders

#### Order a Bicycle (POST)

```http
   /api/orders
```

#### Calculate Revenue from Orders (Aggregation) (GET)

```http
   /api/orders/revenue
```

## Server Live URL

https://assignmen-2-project-api.vercel.app/
