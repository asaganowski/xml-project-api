# XML API Project

## Overview
This project implements an API for processing XML documents using Node.js for the backend and Angular for the frontend. The API provides functionality for saving, deleting, searching, and modifying XML documents.

## Backend

### Setup Instructions
1. Navigate to the `backend` directory.
2. Install the required dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```

### API Endpoints
- **POST /api/xml**: Save a new XML document.
- **DELETE /api/xml/:id**: Delete an XML document by ID.
- **GET /api/xml**: Search for XML documents.
- **PUT /api/xml/:id**: Modify an existing XML document by ID.

### Directory Structure
- `src/app.js`: Entry point of the backend application.
- `src/controllers/xmlController.js`: Handles API requests related to XML documents.
- `src/routes/xmlRoutes.js`: Sets up the routes for the XML API.
- `src/services/xmlService.js`: Contains business logic for processing XML documents.

## Frontend

### Setup Instructions
1. Navigate to the `frontend` directory.
2. Install the required dependencies:
   ```
   npm install
   ```
3. Start the Angular application:
   ```
   ng serve
   ```

### Components
- **xml-list**: Displays a list of XML documents.
- **xml-detail**: Shows details of a selected XML document.
- **xml-form**: Form for creating or modifying XML documents.

### Directory Structure
- `src/app/app.module.ts`: Main module of the Angular application.
- `src/app/services/xml.service.ts`: Service for making HTTP requests to the backend API.

## Conclusion
This project provides a comprehensive solution for managing XML documents through a RESTful API and a user-friendly Angular frontend. For further details, refer to the individual README files in the `backend` and `frontend` directories.