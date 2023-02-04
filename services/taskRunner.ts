/**
 * Task runner service
 */
export default {
  start: (tasks: ITask[]) => {
    console.log("[taskRunner]: Task runner started.");

    tasks.forEach((task) => {
      task.callback();
      setInterval(task.callback, task.interval);
    });
  },
};
