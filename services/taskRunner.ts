/**
 * Task runner service
 */
export default {
  start: (tasks: ITask[]) => {
    console.log("[taskRunner]: Task runner started.");

    tasks.forEach((task) => {
      console.log(`[taskRunner]: Starting task ${task.name}...`);

      task.callback().then(() => {
        console.log(`[taskRunner]: Task ${task.name} completed.`);
      });
      setInterval(task.callback, task.interval);
    });
  },
};
