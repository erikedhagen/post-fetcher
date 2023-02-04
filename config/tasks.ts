import downloadPosts from "../controllers/tasks/downloadPosts";

/**
 * Configure tasks
 */
export default [
  {
    name: "downloadPosts",
    interval: 60 * 60,
    callback: downloadPosts,
  },
];
