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
    console.log("[taskRunner]: Task runner started.");

    tasks.forEach((task) => {
      task.callback();
      setInterval(task.callback, task.interval);
    });

  },
};
