import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const connectionString = "mongodb://127.0.0.1:27017/my_database";

export default {
  connect: () => {
    mongoose.connect(connectionString);
  },
};
