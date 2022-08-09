console.log("Task Manager App");

const express = require("express");
const tasks = require("./routes/tasks");
const app = express();

const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
//routes, controllers folders used, to adhere to Separation of Concerns design principle

//middlewares
app.use(express.json());
app.use(express.static("./public")); //to serve static files

//routes
app.get("/hello", (req, res) => {
  res.send("task manager app");
});

// REST API routes
// app.get('/api/v1/tasks') //get all tasks
// app.post('/api/v1/tasks') //create a new task
// app.get('/api/v1/tasks/:id') //get single task
// app.patch('/api/v1/tasks/:id') //update task
// app.delete('/api/v1/tasks/:id') //delete task

app.use("/api/v1/tasks", tasks);

app.use(notFound); //custom 404

const port = 3000;

const start = async () => {
  // use try catch for asynchronous operations, can handle errors efficiently
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
