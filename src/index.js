const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const verifyToken = require('./middleware/verifyToken');
const registerRoute = require('./routes/auth/register');
const loginRoute = require('./routes/auth/login');
const getUserRoute = require('./routes/users/getUser');
const getUserTodoRoute = require('./routes/users/getUserTodo');
const getUsersRoute = require('./routes/users/getUsers');
const deleteUserRoute = require('./routes/users/deleteUser');
const getTodosRoute = require('./routes/todos/getTodos');
const getTodoByIdRoute = require('./routes/todos/getTodoById');
const postTodoRoute = require('./routes/todos/createTodo');
const deleteTodoRoute = require('./routes/todos/deleteTodo');
const editUserInfoRoute = require("./routes/users/editUserInfo");
const editUserByFieldRoute = require("./routes/users/editUserByField");
const editTodoInfoRoute = require("./routes/todos/editTodo");
const editTodoByFieldRoute = require("./routes/todos/editTodoByField");

// ROUTE NON PROTEGEE
app.use(registerRoute);
app.use(loginRoute);

app.use(verifyToken);
// ROUTE PROTEGEE
app.use(getUserRoute);
app.use(getUserTodoRoute);
app.use(getUsersRoute);
app.use(deleteUserRoute);
app.use(getTodosRoute);
app.use(getTodoByIdRoute);
app.use(postTodoRoute);
app.use(deleteTodoRoute);
app.use(editTodoInfoRoute);
app.use(editTodoByFieldRoute);
app.use(editUserInfoRoute);
app.use(editUserByFieldRoute);

app.listen(process.env.PORT, () => {
    console.log(`App listen at the port ${process.env.PORT}`);
})