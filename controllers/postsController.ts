import { Request, Response, NextFunction } from "express";
import Post from "../models/post";

// GET /posts endpoint
export const get = async (req: Request, res: Response, next: NextFunction) => {
  const posts = await Post.find({}).exec();
  res.send({
    posts,
  });
};

// PUT /posts endpoint
export const put = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const foundPost = await Post.findOne({ id }).exec();
  if (foundPost) {
    await Post.updateOne({ id }, { title, body, lastEditedAt: new Date() });

    res.status(200).send({
      result: "updated",
      post: await Post.findOne({ id }).exec(),
    });
  } else {
    res.status(404).send({ message: "Post not found" });
  }
};

export default {
  get,
  put,
};
