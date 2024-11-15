# MaxHelp API Documentation

## Overview

MaxHelp API provides endpoints for managing users, inventory, sales, feedback, reports, restaurant operations, bookshop operations, and water production and distribution. This documentation will guide you through the available endpoints and their usage.

## Base URL

```
http://localhost:3000/api
```

## Authentication

All endpoints (except for authentication) require a Bearer token. Include the token in the `Authorization` header:

```
Authorization

: Bearer <token>
```

## Endpoints

### Authentication

#### Register

- **URL:** `/auth/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "role": "USER"
  }
  ```
- **Response:**
  ```json
  {
    "id": "user-id",
    "email": "user@example.com",
    "role": "USER",
    "token": "jwt-token"
  }
  ```

#### Login

- **URL:** `/auth/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "id": "user-id",
    "email": "user@example.com",
    "role": "USER",
    "token": "jwt-token"
  }
  ```

### Inventory

#### Add Item

- **URL:** `/inventory`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Item Name",
    "quantity": 100,
    "unitPrice": 10.5,
    "businessUnit": "Unit Name",
    "minStock": 10
  }
  ```
- **Response:**
  ```json
  {
    "id": "item-id",
    "name": "Item Name",
    "quantity": 100,
    "unitPrice": 10.5,
    "businessUnit": "Unit Name",
    "minStock": 10,
    "createdAt": "2023-10-01T00:00:00.000Z"
  }
  ```

#### Get Items

- **URL:** `/inventory`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- ## **Query Parameters:**

businessUnit

(optional)

- **Response:**
  ```json
  [
    {
      "id": "item-id",
      "name": "Item Name",
      "quantity": 100,
      "unitPrice": 10.5,
      "businessUnit": "Unit Name",
      "minStock": 10,
      "createdAt": "2023-10-01T00:00:00.000Z"
    }
  ]
  ```

#### Update Stock

- **URL:** `/inventory/:id/stock`
- **Method:** `PATCH`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "quantity": 50
  }
  ```
- **Response:**
  ```json
  {
    "id": "item-id",
    "name": "Item Name",
    "quantity": 50,
    "unitPrice": 10.5,
    "businessUnit": "Unit Name",
    "minStock": 10,
    "createdAt": "2023-10-01T00:00:00.000Z"
  }
  ```

### Sales

#### Record Sale

- **URL:** `/sales`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "productId": "product-id",
    "quantity": 10,
    "totalAmount": 105.0,
    "businessUnit": "Unit Name"
  }
  ```
- **Response:**
  ```json
  {
    "id": "sale-id",
    "productId": "product-id",
    "quantity": 10,
    "totalAmount": 105.0,
    "businessUnit": "Unit Name",
    "createdAt": "2023-10-01T00:00:00.000Z"
  }
  ```

#### Get Daily Sales

- **URL:** `/sales/daily`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- ## **Query Parameters:**

businessUnit

(optional)

- **Response:**
  ```json
  [
    {
      "id": "sale-id",
      "productId": "product-id",
      "quantity": 10,
      "totalAmount": 105.0,
      "businessUnit": "Unit Name",
      "createdAt": "2023-10-01T00:00:00.000Z"
    }
  ]
  ```

### Feedback

#### Submit Feedback

- **URL:** `/feedback`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "message": "Feedback message",
    "businessUnit": "Unit Name"
  }
  ```
- **Response:**
  ```json
  {
    "id": "feedback-id",
    "userId": "user-id",
    "message": "Feedback message",
    "businessUnit": "Unit Name",
    "createdAt": "2023-10-01T00:00:00.000Z"
  }
  ```

#### Get Feedback

- **URL:** `/feedback`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- ## **Query Parameters:**

businessUnit

(optional)

- **Response:**
  ```json
  [
    {
      "id": "feedback-id",
      "userId": "user-id",
      "message": "Feedback message",
      "businessUnit": "Unit Name",
      "createdAt": "2023-10-01T00:00:00.000Z"
    }
  ]
  ```

### Reports

#### Generate Daily Report

- **URL:** `/reports/daily`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- ## **Query Parameters:**

businessUnit

(optional)

- **Response:**
  ```json
  {
    "businessUnit": "Unit Name",
    "date": "2023-10-01T00:00:00.000Z",
    "totalSales": 1050.0,
    "salesCount": 10,
    "lowStockItems": [
      {
        "id": "item-id",
        "name": "Item Name",
        "quantity": 5,
        "minStock": 10
      }
    ],
    "feedbackCount": 5
  }
  ```

### Restaurant

#### Make Reservation

- **URL:** `/restaurant/reservations`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "customerName": "John Doe",
    "date": "2023-10-01",
    "time": "18:00",
    "tableNumber": 5,
    "guestCount": 4
  }
  ```
- **Response:**
  ```json
  {
    "id": "reservation-id",
    "customerName": "John Doe",
    "date": "2023-10-01",
    "time": "18:00",
    "tableNumber": 5,
    "guestCount": 4,
    "createdAt": "2023-10-01T00:00:00.000Z"
  }
  ```

#### Create Order

- **URL:** `/restaurant/orders`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "tableNumber": 5,
    "items": [
      {
        "name": "Pizza",
        "quantity": 2,
        "price": 15.0
      }
    ],
    "totalAmount": 30.0
  }
  ```
- **Response:**
  ```json
  {
    "id": "order-id",
    "tableNumber": 5,
    "items": [
      {
        "id": "item-id",
        "name": "Pizza",
        "quantity": 2,
        "price": 15.0
      }
    ],
    "totalAmount": 30.0,
    "status": "PENDING",
    "createdAt": "2023-10-01T00:00:00.000Z"
  }
  ```

#### Process Bill

- **URL:** `/restaurant/bills`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "orderId": "order-id",
    "paymentMethod": "Credit Card"
  }
  ```
- **Response:**
  ```json
  {
    "id": "bill-id",
    "orderId": "order-id",
    "paymentMethod": "Credit Card",
    "status": "PAID",
    "createdAt": "2023-10-01T00:00:00.000Z"
  }
  ```

### Bookshop

#### Add Book

- **URL:** `/bookshop/books`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "isbn": "1234567890",
    "price": 20.0,
    "quantity": 50
  }
  ```
- **Response:**
  ```json
  {
    "id": "book-id",
    "title": "Book Title",
    "author": "Author Name",
    "isbn": "1234567890",
    "price": 20.0,
    "quantity": 50,
    "createdAt": "2023-10-01T00:00:00.000Z"
  }
  ```

#### Process Purchase

- **URL:** `/bookshop/purchases`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "bookId": "book-id",
    "quantity": 2,
    "customerId": "customer-id"
  }
  ```
- **Response:**
  ```json
  {
    "id": "purchase-id",
    "bookId": "book-id",
    "quantity": 2,
    "totalAmount": 40.0,
    "customerId": "customer-id",
    "createdAt": "2023-10-01T00:00:00.000Z"
  }
  ```

#### Process Return

- **URL:** `/bookshop/returns`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "purchaseId": "purchase-id",
    "reason": "Damaged book"
  }
  ```
- **Response:**
  ```json
  {
    "id": "return-id",
    "purchaseId": "purchase-id",
    "reason": "Damaged book",
    "status": "APPROVED",
    "createdAt": "2023-10-01T00:00:00.000Z"
  }
  ```

### Water Production and Distribution

#### Record Production

- **URL:** `/water/production`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "batchNumber": "batch-001",
    "quantity": 1000,
    "productionDate": "2023-10-01"
  }
  ```
- **Response:**
  ```json
  {
    "id": "production-id",
    "batchNumber": "batch-001",
    "quantity": 1000,
    "productionDate": "2023-10-01",
    "status": "COMPLETED",
    "createdAt": "2023-10-01T00:00:00.000Z"
  }
  ```

#### Create Distribution Order

- **URL:** `/water/distribution`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "destination": "Location A",
    "quantity": 500,
    "deliveryDate": "2023-10-02"
  }
  ```
- **Response:**
  ```json
  {
    "id": "distribution-id",
    "destination": "Location A",
    "quantity": 500,
    "deliveryDate": "2023-10-02",
    "status": "PENDING",
    "createdAt": "2023-10-01T00:00:00.000Z"
  }
  ```

#### Update Distribution Status

- **URL:** `/water/distribution/:id`
- **Method:** `PATCH`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "status": "DELIVERED"
  }
  ```
- **Response:**
  ```json
  {
    "id": "distribution-id",
    "destination": "Location A",
    "quantity": 500,
    "deliveryDate": "2023-10-02",
    "status": "DELIVERED",
    "createdAt": "2023-10-01T00:00:00.000Z"
  }
  ```

## Error Handling

Errors are returned in the following format:

```json
{
  "status": "error",
  "message": "Error message"
}
```

## Conclusion

This documentation provides an overview of the available endpoints in the MaxHelp API. For any additional questions or support, please contact the backend team.
