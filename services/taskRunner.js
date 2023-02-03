

const tasks = [
  {
    'name': 'downloadPosts',
    'interval': 12000,
    'callback': require('./tasks/downloadPosts'),
  }
]

const taskRunner = (function () {

  const start = () => {
    tasks.forEach(task => {
      task.callback();
      setInterval(task.callback, task.interval);
    });

    console.log('Task runner started');
  }

  return {
    start,
  };
})()

module.exports = taskRunner;