# Fractal Test Repository Setup Guide

Follow these steps to set up and run the Fractal Test GitHub repository:

## Prerequisites

- Docker installed on your machine
- Node.js and pnpm installed for frontend development

## Steps

1. **Running Docker Compose:**
   Start the Docker containers defined in `docker-compose.yml`.

   ```bash
   docker compose -f ./docker-compose.yml up
   ```

2. **Running Spring Boot Backend:**
   Open backend directory with IntelliJ, which will handle the dependencies. Then, run the project.

3. **Running Frontend React with Vite:**
   Navigate to the frontend directory and start the React application using Vite:

   ```bash
   cd frontend
   npx vite
   ```

4. **Accessing the Application:**
   - Once all services are running, access the application at:
     - Backend API: [http://localhost:8080](http://localhost:8080)
     - Frontend UI: [http://localhost:5173](http://localhost:5173)

## Notes

- Ensure all commands are executed in their respective directories as specified above.
- You can check swagger APIs for the backend: [http://localhost:8080/swagger-ui/index.html#/](http://localhost:8080/swagger-ui/index.html#/)
