*Recruit CRM Technical Assignment Documentation*
Table of Contents
Introduction
Setup Instructions
Main Service API Endpoints
Public API Microservice Endpoints
Necessary Commands

*1. Introduction*
This document provides detailed instructions for setting up and running the Recruit CRM Technical Assignment. It includes information on the Main Service and Public API Microservice, along with their respective endpoints and necessary commands.

*2. Setup Instructions*
Follow these steps to set up and run both services:

Main Service
Navigate to the main-service directory.
Install dependencies:
Copy code
npm install
Start the server:
bash
Copy code
nodemon src/server.js
Public API Microservice
Navigate to the public-api directory.
Install dependencies:
Copy code
npm install
Start the server:
bash
Copy code
nodemon src/server.js

*3. Main Service API Endpoints*
POST /api/register: Register a new user.
POST /api/login: Authenticate user credentials and generate JWT token.
POST /api/protected: Access protected data (requires authentication).
POST /api/candidate: Add a candidate to the database.
GET /api/candidate: Retrieve candidates for the logged-in user.

*4. Public API Microservice Endpoints*
POST /api/public/profile: Retrieve profile information using API key.
GET /api/public/candidate: Retrieve candidates using API key.

*5. Necessary Commands*
npm install: Install dependencies for each service.
nodemon src/server.js: Start the server for each service.
