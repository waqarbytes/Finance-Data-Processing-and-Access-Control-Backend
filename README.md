# Finance Dashboard API

This is the backend service for the Finance Dashboard platform assignment. It's built entirely in Node.js with Express, TypeScript, and Prisma ORM.

## Tech Stack
- **Node.js / Express**: Standard REST API routing
- **TypeScript**: Type safety across controllers and middlewares
- **Database**: SQLite (via Prisma driver adapters)
- **ORM**: Prisma v7
- **Validation**: Zod schemas for parsing inputs
- **Auth**: JWT & Bcrypt

## Setup

1. Install the dependencies
   ```bash
   npm install
   ```

2. Run the development server
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:3000` (or `5001` if there are port collisions). 
   *Note: I left the `dev.db` file in the repo so you don't need to spin up or migrate a database from scratch to test the endpoints.*

## Testing
There's an `api.http` file included. You can use the VS Code REST Client extension to run all the queries straight from your editor. Just login to get the token, paste it at the top, and you're good to go.

## Features & RBAC

I implemented a 3-tier Role-Based Access Control logic:
- **VIEWER**: Basic access.
- **ANALYST**: Can read transactions and pull dashboard analytics.
- **ADMIN**: Full management access (can POST, PUT, DELETE transactions).

I also added an `ACTIVE`/`INACTIVE` status field on the User model. If an account is suspended (set to INACTIVE), the login route will throw a 403 error.

## Endpoints Summary

**Auth**
* `POST /api/auth/register` 
* `POST /api/auth/login` 
* `GET /api/auth/me`

**Transactions**
* `POST /api/transactions`
* `GET /api/transactions`
* `PUT /api/transactions/:id`
* `DELETE /api/transactions/:id`

**Dashboard**
* `GET /api/dashboard/summary` (calculates total income, expenses, current balance, and aggregates category totals)
