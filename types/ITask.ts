interface ITask {
  name: string;
  interval: number;
  callback: () => Promise<any>;
}
