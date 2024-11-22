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

## API Reference

# Bicycles

#### Create a Bicycle

```http
  POST /api/products
```

#### Get All Bicycles

```http
  GET /api/products
```

#### Get a Specific Bicycle

```http
  GET /api/products/:productId
```

| Parameter   | Type     | Description                       |
| :---------- | :------- | :-------------------------------- |
| `productId` | `string` | **Required**. Id of item to fetch |

#### Update a Bicycle

```http
  PUT /api/products/:productId
```

| Parameter   | Type     | Description                       |
| :---------- | :------- | :-------------------------------- |
| `productId` | `string` | **Required**. Id of item to fetch |

#### Delete a Bicycle

```http
  DELETE /api/products/:productId
```

| Parameter   | Type     | Description                       |
| :---------- | :------- | :-------------------------------- |
| `productId` | `string` | **Required**. Id of item to fetch |

## Orders

#### Order a Bicycle

```http
  POST /api/orders
```

#### Calculate Revenue from Orders (Aggregation)

```http
  GET /api/orders/revenue
```

## Server Live URL

https://assignment-api-project.vercel.app/
