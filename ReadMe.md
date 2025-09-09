# API Documentation

## 🌐 Base URL

The base URL for all API endpoints is:
```
http://localhost:5000
```

---

## 👥 User Roles

The system has three distinct user roles, each with specific permissions:

| Role                   | Description                 | Permissions                                          |
| ---------------------- | --------------------------- | ---------------------------------------------------- |
| **System Administrator** | Full system access          | Create users/stores, view all data, dashboard access |
| **Store Owner**        | Store management access     | Login, view store dashboard, see store ratings       |
| **Normal User**        | Standard user access        | Register, login, view stores, submit ratings         |

---

## 🛣️ API Endpoints

This section outlines the available API endpoints, their purpose, and access levels.

### 🔐 Authentication Endpoints (`/api/auth`)

These endpoints handle user authentication, including registration, login, and password management.

- **`POST /api/auth/register`**
  - **Access**: Public (Normal Users only)
  - **Description**: Registers a new normal user account.

- **`POST /api/auth/login`**
  - **Access**: Public (All roles)
  - **Description**: Authenticates a user and returns a JWT token for session management.

- **`PUT /api/auth/password`**
  - **Access**: Authenticated users
  - **Description**: Allows an authenticated user to update their password.

---

### 👥 User Management Endpoints (`/api/users`)

These endpoints are for managing user accounts and are restricted to System Administrators.

- **`GET /api/users/dashboard/stats`**
  - **Access**: System Administrator only
  - **Description**: Retrieves system-wide statistics, such as total users, stores, and ratings.

- **`GET /api/users`**
  - **Access**: System Administrator only
  - **Description**: Retrieves a list of all users, with support for filtering and sorting.

- **`POST /api/users`**
  - **Access**: System Administrator only
  - **Description**: Creates a new user with any specified role.

- **`GET /api/users/{id}`**
  - **Access**: System Administrator only
  - **Description**: Fetches detailed information for a specific user by their ID.

---

### 🏪 Store Management Endpoints (`/api/stores`)

These endpoints manage store information, dashboards, and listings.

- **`GET /api/stores/dashboard`**
  - **Access**: Store Owner or System Administrator
  - **Description**: Provides dashboard data for a store owner, including store details and ratings.

- **`GET /api/stores`**
  - **Access**: All authenticated users
  - **Description**: Returns a list of all stores, with options for searching and sorting.

- **`POST /api/stores`**
  - **Access**: System Administrator only
  - **Description**: Creates a new store and assigns it to a store owner.

- **`GET /api/stores/{id}`**
  - **Access**: All authenticated users
  - **Description**: Retrieves detailed information for a specific store.

- **`GET /api/stores/{id}/ratings`**
  - **Access**: Store Owner (for their own store) or System Administrator
  - **Description**: Gets all ratings submitted for a specific store.

---

### ⭐ Rating Management Endpoints (`/api/ratings`)

These endpoints are used for submitting and managing store ratings.

- **`POST /api/ratings`**
  - **Access**: Normal User or System Administrator
  - **Description**: Submits a new rating for a store.

- **`PUT /api/ratings`**
  - **Access**: Normal User or System Administrator
  - **Description**: Allows a user to update a rating they have already submitted.

- **`GET /api/ratings/store/{storeId}`**
  - **Access**: Normal User or System Administrator
  - **Description**: Retrieves the current user's rating for a specific store.

---

