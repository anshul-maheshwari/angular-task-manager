import {
  ITask,
  ListTasksComponent
} from "../../list-tasks/list-tasks.component";
import { CommonService } from "../Services/common.service";
import { Injector, Injectable } from "@angular/core";
import { Subject, BehaviorSubject, ReplaySubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class TasksService {
  tasks: ITask[] = [];
  tasksSubject = new Subject<ITask[]>();
  tasksBehaviourSubject = new BehaviorSubject<ITask[]>([...this.tasks]);
  tasksReplySubject = new ReplaySubject<ITask[]>(2);

  constructor(private commonService: CommonService) {}

  addNewTask(): void {
    this.tasks.push({ id: new Date().toTimeString() });
  }

  clear(): void {
    this.tasks = [];
  }

  updateTask(data: ITask) {
    if (data && data.id) {
      const toUpdateData = (this.tasks || []).find(
        fTask => fTask.id === data.id
      );
      if (toUpdateData) {
        toUpdateData.title = data.title;
        toUpdateData.assignedTo = data.assignedTo;
        toUpdateData.description = data.description;
      }
      this.tasksSubject.next([...this.tasks]);
      this.tasksBehaviourSubject.next([...this.tasks]);
      this.tasksReplySubject.next([...this.tasks]);
    }
  }

  deleteTask(id: string): void {
    if (id) {
      this.tasks = (this.tasks || []).filter(fTask => fTask.id !== id);
    }
    this.tasksSubject.next([...this.tasks]);
    this.tasksBehaviourSubject.next([...this.tasks]);
    this.tasksReplySubject.next([...this.tasks]);
  }

  exportTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  loadTasks(): void {
    try {
      this.tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    } catch (e) {
      this.tasks = [];
    }
    this.removeExtraTasks(this.maxNumberOfTasks);
  }

  private removeExtraTasks(size: number): void {
    if (size < this.tasks.length) {
      this.tasks.length = size;
    }
    // Note: Alternate
    // const toRemove = this.tasks.length - size;
    // if (toRemove > 0) {
    //   this.tasks = this.tasks.splice(size - 1, toRemove);
    // }
  }

  getTask(id: string): ITask {
    return (this.tasks || []).find(fTask => fTask.id === id);
  }
}
