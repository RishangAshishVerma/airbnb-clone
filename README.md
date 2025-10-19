-----

# Airbnb-Style REST API 🏡

Welcome to the backend API for an Airbnb-style property rental platform. This project provides a robust and scalable foundation built with **Node.js**, **Express.js**, and **MongoDB**.

This is a **backend-only** application, designed to be consumed by any frontend client (e.g., React, Vue, Angular, or a mobile app) via its RESTful endpoints.

-----

## ✨ Key Features

  * 🔐 **User Authentication**: Secure signup, login, logout, and password reset functionality using JSON Web Tokens (JWT) and OTP verification.
  * 👤 **Profile Management**: Endpoints for users to view and update their profile information.
  * 🏡 **Listing Management**: Full CRUD (Create, Read, Update, Delete) functionality for property listings, including image uploads.
  * ⭐️ **Rating System**: Users can rate and review properties.
  * 📅 **Booking System**: A complete booking workflow, allowing users to create and cancel reservations.
  * 🔍 **Advanced Search**: Flexible search and filtering for listings based on city, category, and other criteria.
  * 🖼️ **Image Uploads**: Seamless image handling with **Multer**, with optional cloud storage via **Cloudinary**.

-----

## 🛠️ Tech Stack

  * **Backend**: Node.js, Express.js
  * **Database**: MongoDB with Mongoose (ORM)
  * **Authentication**: JSON Web Tokens (JWT)
  * **Password Hashing**: Bcrypt.js
  * **File Uploads**: Multer & Cloudinary
  * **Email/OTP**: Nodemailer

-----

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

  * [Node.js](https://nodejs.org/en/) (v14 or later recommended)
  * [MongoDB](https://www.mongodb.com/try/download/community) installed and running, or a MongoDB Atlas connection string.

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd back-end
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root of the project and add the following configuration.

    ```env
    NODE_ENV="production"
    
    # Server Configuration
    PORT=5000

    # MongoDB Connection
    MONGO_URI=<your_mongodb_connection_string>

    # JWT Authentication
    JWT_SECRET=<your_strong_jwt_secret>

    # Cloudinary (for image storage)
    CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
    CLOUDINARY_API_KEY=<your_cloudinary_api_key>
    CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

    # Nodemailer (for OTP emails)
    EMAIL_USER=<your_email_address>
    EMAIL_PASS=<your_email_password_or_app_password>
    
    ```

### Running the Application

  * **Development Mode** (with automatic restarts using `nodemon`):

    ```bash
    npm run dev
    ```

  * **Production Mode**:

    ```bash
    npm start
    ```

The server will be running at `http://localhost:5000` (or the port you specified in `.env`). You can now test the endpoints using a tool like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

-----

## API Endpoints Guide

**Note**: Routes marked with ✅ are protected. You must provide a valid JWT in the `Authorization` header as a `Bearer` token.

### 👤 Auth Routes (`/api/auth`)

| Method   | Endpoint          | Description                        | Protected |
| :------- | :---------------- | :--------------------------------- | :-------: |
| `POST`   | `/signup`         | Register a new user                |     ❌     |
| `GET`    | `/login`          | Log in an existing user            |     ❌     |
| `POST`   | `/requestotp`     | Request OTP for password reset     |     ❌     |
| `POST`   | `/resetpassword`  | Reset password using OTP           |     ❌     |
| `POST`   | `/updatename`     | Update the logged-in user's name   |     ✅     |
| `GET`    | `/logout`         | Log out the current user           |     ✅     |
| `DELETE` | `/delete`         | Delete the logged-in user's account|     ✅     |

### 🙋 User Routes (`/api/user`)

| Method   | Endpoint        | Description                         | Protected |
| :------- | :-------------- | :---------------------------------- | :-------: |
| `GET`    | `/currentuser`  | Get info of the logged-in user      |     ✅     |

### 🏡 Listing Routes (`/api/listing`)

| Method   | Endpoint              | Description                               | Protected |
| :------- | :-------------------- | :---------------------------------------- | :-------: |
| `POST`   | `/add`                | Add a new listing (up to 3 images)        |     ✅     |
| `GET`    | `/get`                | Get all available listings                |     ❌     |
| `GET`    | `/userlisting`        | Get listings created by the logged-in user|     ✅     |
| `GET`    | `/getlistingbyid/:id` | Get details of a single listing by ID     |     ✅     |
| `GET`    | `/delete/:id`         | Delete a listing by ID                    |     ✅     |
| `POST`   | `/rating/:id`         | Rate a listing                            |     ✅     |
| `GET`    | `/update/:id`         | Update listing details and images         |     ✅     |
| `GET`    | `/search`             | Search listings by query params           |     ❌     |

### 📅 Booking Routes (`/api/booking`)

| Method   | Endpoint              | Description                      | Protected |
| :------- | :-------------------- | :------------------------------- | :-------: |
| `POST`   | `/createbooking/:id`  | Create a booking for a listing   |     ✅     |
| `DELETE` | `/cancelbooking/:id`  | Cancel an existing booking       |     ✅     |

-----

## 📁 Folder Structure

```
back-end/
│
├── controllers/      # Contains the business logic for each route
├── middleware/       # Express middlewares (e.g., authentication)
├── models/           # Mongoose schemas and models (User, Listing, etc.)
├── routes/           # Defines the API routes and links them to controllers
├── uploads/          # Temporary storage for images handled by Multer
│
├── .env              # Environment variables (ignored by Git)
├── index.js          # Main application entry point
└── package.json      # Project dependencies and scripts
```

-----

## ✍️ Author

  * **Rishang**
