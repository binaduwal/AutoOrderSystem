
# AutoOrderSystem

AutoOrderSystem is a full-stack web application designed to automate the ordering process. It features a modern React frontend built with Vite for a fast development experience and a robust Node.js backend using Express and MongoDB for data storage and management.

## Features
* User authentication and authorization using JSON Web Tokens (JWT)
* CRUD operations for managing orders
* File upload functionality
* Responsive and intuitive user interface with Tailwind CSS

## Tech Stack
* Frontend: React, Vite, Tailwind CSS, React Router
* Backend: Node.js, Express, MongoDB, Mongoose
* Authentication: JWT (with jsonwebtoken and bcrypt)
* File Uploads: Multer

## Prerequisites
Before you begin, ensure you have the following installed on your machine:

* Node.js (v14 or higher)
* MongoDB (either a local installation or a cloud instance like MongoDB Atlas)
* Git (to clone the repository)

##  Install Dependency
Follow these steps to set up and run the AutoOrderSystem on your local machine:

### 1. Clone the Repository
Clone the project from GitHub and navigate into the project directory:
```
git clone https://github.com/binaduwal/AutoOrderSystem.git

```
### 2. Set Up the Backend
The backend is a Node.js application that requires some configuration.
* Navigate to the backend directory:
```
cd Backend
```

* Install the dependencies:
```
npm install
```

* Create a .env file in the backend directory with the following content:
```
PORT=5000
JWT_SECRET=admin_secret_key
API_BASE_URL=http://localhost:5000
```


### 3. Set Up the Frontend
The frontend is a React application built with Vite.

* Navigate to the frontend directory:
```
cd ../Frontend
```

* Install the dependencies:
```
npm install
```

* Configure the API Base URL: The frontend uses src/config.js to set the base URL for API requests:
```
const BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000"
export default BASE_URL;
```


## 4. Run the Application
You’ll need to run both the backend and frontend servers simultaneously.
* Start the backend server:
    * In one terminal, navigate to the backend directory:
    ```
    cd backend
    npm start
    ```
* Start the frontend server:
    * In a separate terminal, navigate to the frontend directory:
    ```
    cd frontend
    npm run dev
    ```

