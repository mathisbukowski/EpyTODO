# EpyTODO

EpyTODO is a task management API built using Node.js with a MySQL database. The goal of this project is to provide a backend for managing todo tasks, allowing users to create, manage, and track their tasks efficiently through RESTful endpoints.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Task Creation**: Add new tasks with titles, descriptions, and due dates.
- **Task Management**: Edit and delete existing tasks.
- **Task Tracking**: Mark tasks with statuses such as not started, in progress, or done.
- **User Management**: Register, login, and manage user information.
- **RESTful Endpoints**: Handle CRUD (Create, Read, Update, Delete) operations via well-defined endpoints.

## Prerequisites

- Node.js (version 14.x or higher)
- MySQL
- npm (Node Package Manager)

## Installation

To install and run this project locally, follow the steps below:

1. Clone the repository:
    ```sh
    git clone https://github.com/mathisbukowski/EpyTODO.git
    cd EpyTODO
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Set up the database:
    - Create a MySQL database named `epytodo`.
    - Create the necessary tables (`user` and `todo`) using the `epytodo.sql` script provided in the root of the repository.
    - Update the database configuration in the `.env` file with your database credentials.

4. Run the migrations to set up the database schema:
    ```sh
    npm run migrate
    ```

5. Start the server:
    ```sh
    npm start
    ```

6. The API will be accessible at `http://localhost:3000`.

## Usage

Once the API is running, you can interact with it using tools like Postman or curl. Below are the available endpoints:

## Endpoints

### User Endpoints

- **Register a User**
    ```http
    POST /register
    ```
    - Request Body: `{ "email": "user@example.com", "password": "password", "name": "John", "firstname": "Doe" }`

- **Login a User**
    ```http
    POST /login
    ```
    - Request Body: `{ "email": "user@example.com", "password": "password" }`

- **View User Information**
    ```http
    GET /user
    ```

- **View User's Tasks**
    ```http
    GET /user/todos
    ```

- **View Specific User Information**
    ```http
    GET /users/:id
    ```

- **Update User Information**
    ```http
    PUT /users/:id
    ```
    - Request Body: `{ "email": "newemail@example.com", "password": "newpassword", "name": "NewName", "firstname": "NewFirstname" }`

- **Delete a User**
    ```http
    DELETE /users/:id
    ```

### Todo Endpoints

- **View All Todos**
    ```http
    GET /todos
    ```

- **View a Specific Todo**
    ```http
    GET /todos/:id
    ```

- **Create a Todo**
    ```http
    POST /todos
    ```
    - Request Body: `{ "title": "Task title", "description": "Task description", "due_time": "2024-12-31 23:59:59", "user_id": 1, "status": "todo" }`

- **Update a Todo**
    ```http
    PUT /todos/:id
    ```
    - Request Body: `{ "title": "Updated title", "description": "Updated description", "due_time": "2024-12-31 23:59:59", "user_id": 1, "status": "in progress" }`

- **Delete a Todo**
    ```http
    DELETE /todos/:id
    ```

## Contributing

Contributions are welcome! To contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Authors

- [Mathis Bukowski](https://github.com/mathisbukowski)
- [Rafael Drouart](https://github.com/rafaeldrouart)
- [Raphaël Richaud](https://github.com/raph559)
