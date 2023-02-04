interface ITask {
  name: string;
  interval: number;
  callback: () => void;
}
