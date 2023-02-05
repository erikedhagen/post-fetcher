import { Schema, model, connect } from "mongoose";

const postSchema = new Schema<IPost>({
  id: { type: Number, required: true },
  title: { type: String, required: true, maxLength: 100 },
  body: { type: String },
  userId: { type: Number },
  lastEditedAt: { type: Date },
});

const Post = model<IPost>("Post", postSchema);

export default Post;
