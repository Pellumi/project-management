# MaxHelp API

MaxHelp API is a backend service that provides endpoints for managing users, inventory, sales, feedback, reports, restaurant operations, bookshop operations, and water production and distribution.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/LazyEllis/maxhelp-api.git
   cd maxhelp-api
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the database:

   ```sh
   npx prisma migrate dev
   ```

4. Seed the database (optional):
   ```sh
   npx prisma db seed
   ```

## Usage

1. Start the server:

   ```sh
   npm start
   ```

2. The server will be running at `http://localhost:3000`.

## API Documentation

For detailed API documentation, refer to the [API Documentation](./API_DOCUMENTATION.md).

## Environment Variables

Create a .env file in the root directory and add the following environment variables:

```
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
PORT=3000
```

## Scripts

- `start`: Start the server
- `dev`: Start the server in development mode with file watching
- `lint`: Run ESLint to check for linting errors
- `format`: Run Prettier to format the code
