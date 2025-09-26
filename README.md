# Inventory System

An inventory management system built with TypeScript, Express, and PostgreSQL, implementing concurrency control for inventory decrement operations.

This system was created only to make tests running locally of a pessimistic lock.

## 🚀 Features

- **RESTful API** built with Express.js
- **Concurrency control** in PostgreSQL with pessimistic locking
- **Custom error handling** for out-of-stock products
- **Structured logging** with Winston
- **Load testing** with K6
- **TypeScript** for type safety
- **Docker Compose** for development environment

## 📋 Prerequisites

- Node.js (version 24 or higher)
- Yarn
- Docker and Docker Compose

## 🛠️ Installation

1. Install dependencies:
```bash
yarn install
```

2. Start the PostgreSQL database:
```bash
docker-compose up -d
```

3. Setup the database (creates tables and initial data):
```bash
yarn setup-db # optional since execution command already does this step
```

## 🚀 How to run the app

### Starting the server

To run in development mode:
```bash
yarn dev
```

The server will start on the port specified in the `PORT` environment variable (default: see configuration file).

### API Endpoints

#### POST /inventory
The product always has 100 units available in stock

Decrements the inventory of a product.

**Success response (201):**
```json
{
  "message": "decrement made successfully"
}
```

**Out of stock product (409):**
```json
{
  "message": "out of stock error"
}
```

**Internal server error (500):**
```json
{
  "message": "an unknown server error was thrown"
}
```

## 🧪 Testing

Run load tests with K6:
```bash
yarn test
```

## 🏗️ Project structure

```
src/
├── main.ts                 # Main application file
├── decrement-inventory.ts   # Inventory decrement logic
├── out-of-stock-error.ts    # Custom error class
├── setup-db.ts            # Database setup script
└── shared/
    ├── config-envs.ts      # Environment configurations
    ├── database.ts         # Database connection
    ├── env.ts              # Environment variable utilities
    └── logger.ts           # Logging configuration
tests/
└── make-http-requests.js        # K6 load tests
```

## 🔧 Technologies used

- **TypeScript** - Main language
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Winston** - Logging system
- **K6** - Performance testing
- **Docker Compose** - Container orchestration
- **tsx** - TypeScript executor for development

## 🎯 Technical features

### Concurrency control
The system uses PostgreSQL transactions with `FOR UPDATE` to ensure that multiple simultaneous requests don't cause race conditions when decrementing inventory.

### Error handling
- **OutOfStockError**: Custom error thrown when a product is out of stock
- **Automatic rollback**: In case of error, the transaction is automatically rolled back
- **Connection release**: Ensures database connections are always released

### Logging
Structured logging system that records important application events.

## 📝 Available scripts

- `yarn dev` - Starts the server in development mode with hot reload
- `yarn test` - Runs load tests
- `yarn setup-db` - Sets up the database

## 🐳 Docker

The project includes a `docker-compose.yaml` that configures:
- PostgreSQL 15
- Host: `localhost`
- Port: `5432`
- Database: `inventory_db`
- User: `inventory_user`
- Password: `inventory_password`