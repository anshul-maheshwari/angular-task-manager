import { ITask } from "../../list-tasks/list-tasks.component";

export class CommonService {
  constructor() {}

  toString(task: ITask): string {
    return `${task.title}`;
  }
}
