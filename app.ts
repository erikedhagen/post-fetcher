import express, { Express } from "express";
import database from "./services/database";

import path from "path";
import taskRunner from "./services/taskRunner";

import indexRouter from "./routes/index";
import postsRouter from "./routes/posts";

/**
 * Connect to database
 */
database.connect();

/**
 * Setup express app
 */
const app: Express = express();
const port = process.env.PORT || 3000;

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
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
