import express, { Request, Response, NextFunction } from "express";
import postsController from "../controllers/postsController";
const router = express.Router();

/* GET posts. */
router.get("/", postsController.get);

/* PUT posts. */
router.put("/:id", postsController.put);
export default router;