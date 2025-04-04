#Test Task

## Screenshots

### Posts Management Interface
![Posts Management](./screenshots/posts-management.png)
*Main interface showing the posts grid with CRUD capabilities*

### Create Post Form
![Create Post](./screenshots/create-post.png)
*Form for creating new posts with validation*

### Delete Confirmation
![Delete Confirmation](./screenshots/delete-confirmation.png)
*Confirmation dialog when deleting posts*

This setup provides:
1. A NestJS backend with:
CRUD operations for posts
Integration with the external API
TypeScript support
Unit tests structure
An Angular frontend with:
DevExpress DataGrid component
CRUD operations UI
TypeScript support
Proper styling and layout
Docker configuration:
Separate containers for frontend and backend
Nginx configuration for the frontend
Docker Compose for easy deployment
To run the application:
Clone the repository
Navigate to the project root
Run docker-compose up
The application will be available at:
Frontend: http://localhost
Backend API: http://localhost:3000
This test task covers all the required aspects and provides a good foundation for evaluating a full-stack developer's skills in:
TypeScript
Angular
DevExpress
Node.js/NestJS
Docker
API integration
Testing



To get started:
In the root directory, run:
npm run install:all
2. To start development servers:
# In separate terminals:
npm run start:backend
npm run start:frontend
3. To build for production:
npm run build   
4. To run tests:
npm test
These configurations are designed to streamline the development process and ensure a smooth deployment experience.  

## Environment Requirements

- Node.js 18+
- npm 8+
- Docker and Docker Compose (for containerized deployment)

## Notes

- The backend integrates with JSONPlaceholder API for demonstration purposes
- Frontend includes dark mode styling for all components
- DevExpress DataGrid includes features like:
  - Sorting
  - Filtering
  - Pagination
  - Responsive layout
  - Custom column widths
  - Action buttons  
