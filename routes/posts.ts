import express, { Request, Response, NextFunction } from "express";
import postsController from "../controllers/postsController";
import Post from "../models/post";
const router = express.Router();

/* GET posts. */
router.get("/", postsController.get);

/* PUT posts. */
router.put("/:id", postsController.put);
export default router;

// run().catch((err) => console.log(err));

// async function run() {
//   // 4. Connect to MongoDB
//   await connect("mongodb://127.0.0.1:27017/test");

//   const user = new User({
//     name: "Bill",
//     email: "bill@initech.com",
//     avatar: "https://i.imgur.com/dM7Thhn.png",
//   });
//   await user.save();

//   console.log(user.email); // 'bill@initech.com'
// }
