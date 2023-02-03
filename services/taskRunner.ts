import downloadPosts from "./tasks/downloadPosts";

/**
 * Register tasks
 */
const tasks = [
  {
    name: "downloadPosts",
    interval: 12000,
    callback: downloadPosts,
  },
];

export default {
  start: () => {
    tasks.forEach((task) => {
      task.callback();
      setInterval(task.callback, task.interval);
    });

    console.log("Task runner started");
  },
};
