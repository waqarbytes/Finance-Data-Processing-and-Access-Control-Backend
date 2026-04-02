# Finance Dashboard Backend

A robust and secure backend service for a Finance Dashboard platform, built with Node.js, Express, TypeScript, and Prisma ORM.

## 🚀 Features
- **Authentication & Authorization**: Secure User Registration and Login via JSON Web Tokens (JWT) and Bcrypt password hashing.
- **Role-Based Access Control (RBAC)**: Strict separation using 3 distinct role tiers (`VIEWER`, `ANALYST`, `ADMIN`) mapped to specific backend transaction permissions.
- **Account Lifecycles**: Built-in User `status` mapping (`ACTIVE` vs `INACTIVE`) to prevent deactivated users from authenticating.
- **Robust Input Validation**: Strict validation layer using `zod` schema to sanitize user inputs before processing.
- **Relational Database Management**: Utilizing Prisma ORM over a local SQLite database for highly stable and optimized querying capabilities.
- **Financial Analytics**: In-built Database aggregation computing total income, expected expenses, Category-wise breakdown totals, and dynamic balances directly via the ORM layer.

## 🛠 Tech Stack
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: SQLite (via Prisma Driver Adapters `better-sqlite3`)
- **ORM**: Prisma (v7+)
- **Security**: jsonwebtoken, bcrypt

## 📦 Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Migrations**
   (If the database schema changes, simply run the prisma generator command):
   ```bash
   npx prisma generate
   ```
   > Note: We natively bundled a `.db` SQLite file locally so no active database hosting process is needed for development!

3. **Start the Application**
   Run the backend in development mode with automatic restarts on file changes:
   ```bash
   npm run dev
   ```
   The backend will boot up typically on `http://localhost:3000` (or `5001`). 

## 🧪 Testing the API

For the quickest verification, we provided an `api.http` file compatible with the **VS Code REST Client** extension. Open `api.http`, and you can interact with the server natively without firing up Postman! 

> **Important**: Upon running the `POST /api/auth/login` endpoint, copy the returned `token` into the top of the `api.http` file to authenticate further queries!

## 🔗 API Endpoints

### Authentication
* `POST /api/auth/register`: Create a new User
* `POST /api/auth/login`: Issue an authentication Token
* `GET /api/auth/me`: Get current authenticated user details

### User Actions (Admin)
* `GET /api/users/`: Retrieve all users (Requires `ADMIN` role)

### Transactions
* `POST /api/transactions/`: Log a new Income/Expense record
* `GET /api/transactions/`: Retrieve all records associated with logged-in user
* `PUT /api/transactions/:id`: Update an existing record
* `DELETE /api/transactions/:id`: Delete a record

### Dashboard
* `GET /api/dashboard/summary`: Retrieve aggregated current Balance, total Income, and Expenses.
