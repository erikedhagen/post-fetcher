import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

import path from "path";
import taskRunner from "./services/taskRunner";

/**
 * Connect to database
 */
mongoose.set("strictQuery", false);
const connectionString = "mongodb://127.0.0.1:27017/my_database";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(connectionString);
}

var indexRouter = require("./routes/index");

/**
 * Setup express app
 */
const app: Express = express();
const port = process.env.PORT;

// Start task runner
taskRunner.start();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

/**
 * Setup middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

/**
 * Setup routes
 */
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;
