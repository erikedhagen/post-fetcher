import tasks from "./config/tasks";

import express, { Express } from "express";
import database from "./services/database";

import path from "path";
import taskRunner from "./services/taskRunner";

import postsRouter from "./routes/posts";

/**
 * Connect to database
 */
database.connect();

/**
 * Setup express app
 */
const app: Express = express();
const port = process.env.EXPRESS_PORT || 3000;

/**
 * Setup middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

/**
 * Setup routes
 */
app.use("/posts", postsRouter);

/**
 * Start server and task runner
 */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  taskRunner.start(tasks);
});

export default app;
