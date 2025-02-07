# OAuth 2.0 Server - Upfirst

This project is a **TypeScript-based OAuth 2.0 server** that implements the **Authorization Code Grant** flow. It provides two REST API endpoints for authorization and token exchange, adhering to the OAuth 2.0 specification.

---

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [How to Run the Application](#how-to-run-the-application)
3. [How to Test the Application](#how-to-test-the-application)
4. [Technical Choices](#technical-choices)
5. [Future Improvements](#future-improvements)
6. [API Endpoints](#api-endpoints)

---

## Setup Instructions

### Prerequisites

- **Node.js** (v20 or higher)
- **npm** (v10 or higher)
- **Docker** (optional, for containerized deployment)
- **TypeScript** (installed globally via `npm install -g typescript`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mightstar/oauth-rest-api.git
   cd oauth-rest-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root directory and add the following environment variables:
   ```bash
   PORT=8080
   JWT_SECRET=upfirst-secret-key
   CLIENT_ID=upfirst
   REDIRECT_URI=http://localhost:8081/process
   ```

## How to Run the Application

### Running Locally

1. Build the TypeScript project:
   ```bash
   npm run build
   ```
2. Start the server:
   ```bash
   npm start
   ```

### Running with Docker

1. Build the Docker image:
   ```bash
   npm run docker:build
   ```
2. Run the Docker container:
   ```bash
   npm run docker:run
   ```
   Alternatively, use Docker Compose:
   ```bash
   npm run docker:compose
   ```

## How to Test the Application

### Running Tests Locally

- Run unit and integration tests:

   ```bash
   npm test
   ```

### Running Tests with Docker

- Run tests inside a Docker container:

   ```bash
   docker-compose up test
   ```

## Technical Choices

### 1. TypeScript

- Used for type safety and better developer experience.
- Enables catching errors at compile time, reducing runtime issues.

### 2. Express

- Chosen for its simplicity and flexibility in building REST APIs.
- Provides a robust middleware system for handling requests and responses.

### 3. JOSE Library

- Used for JWT operations (signing and verifying tokens).
- Ensures secure token generation and validation.

### 4. Docker

- Containerized the application for consistent deployment across environments.
- Simplifies dependency management and scaling.

### 5. Jest

- Used for unit and integration testing.
- Provides a simple and powerful testing framework with built-in assertions and mocking.

### 6. Environment Variables

- Sensitive configuration (e.g., JWT_SECRET) is stored in .env for security.
- Makes the application configurable without modifying code.

## Future Improvements

### 1. Database Integration:

- Use a database (e.g., PostgreSQL, MongoDB) to store client information, authorization codes, and tokens.
- Implement token revocation and expiration.

### 2. Logging and Monitoring:

- Add logging and monitoring for better observability.

## API Endpoints

### Authorization Endpoint

- **URL**: `GET /api/oauth/authorize`
- **Parameters**:
  - `response_type=code`
  - `client_id=upfirst`
  - `redirect_uri=http://localhost:8081/process`
  - `state` (optional)
- **Response**: Redirects to redirect_uri with an authorization code.

### Token Endpoint

- **URL**: `POST /api/oauth/token`
- **Parameters**:
  - grant_type=authorization_code
  - `code` (authorization code from the previous step)
  - `client_id=upfirst`
  - `redirect_uri=http://localhost:8081/process`
- **Response**: Returns a JSON object with `access_token`, `token_type`, `expires_in`, `refresh_token`, and optionally
