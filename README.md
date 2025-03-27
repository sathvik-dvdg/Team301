# Smart Irrigation System Backend

This is the backend server for the Smart Irrigation System. It provides APIs for user authentication and irrigation system management.

## Features

- User authentication (signup/login)
- JWT-based authorization
- Irrigation system control
- Sensor data management
- Scheduling system
- Settings management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/smart-irrigation
   JWT_SECRET=your-secret-key-here
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register a new user
- POST `/api/auth/login` - Login user

### Irrigation System
- GET `/api/irrigation/status` - Get system status
- PUT `/api/irrigation/settings` - Update system settings
- PUT `/api/irrigation/schedule` - Update watering schedule
- POST `/api/irrigation/control` - Manual control
- POST `/api/irrigation/sensor-data` - Update sensor data

## Security

- All routes except authentication require a valid JWT token
- Passwords are hashed using bcrypt
- Environment variables for sensitive data

## Error Handling

The API returns appropriate HTTP status codes and error messages for various scenarios:
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error 