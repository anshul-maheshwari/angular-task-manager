import { Component, OnInit, Input, SimpleChanges } from "@angular/core";

import { from } from "rxjs";
import { TasksService } from "../core/Services/tasks.service";

export interface ITask {
  id?: string;
  title?: string;
  description?: string;
  assignedTo?: string;
}

@Component({
  selector: "app-list-tasks",
  templateUrl: "./list-tasks.component.html",
  styleUrls: ["./list-tasks.component.css"]
})
export class ListTasksComponent implements OnInit {
  constructor(private tasksService: TasksService) {}
  tasks: ITask[] = [];
  @Input() maxNumberOfTasks = 5;
  ngOnInit() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    const maxNumberOfTasksChanges = simpleChanges["maxNumberOfTasks"];
    if (
      maxNumberOfTasksChanges &&
      maxNumberOfTasksChanges.currentValue < this.tasks.length
    ) {
      this.removeExtraTasks(maxNumberOfTasksChanges.currentValue);
    }
  }

  clear(): void {
    this.tasksService.clear();
    // this.tasks = [];
  }

  addTask(): void {
    if (this.tasks.length < this.maxNumberOfTasks) {
      this.tasksService.addNewTask();

      // this.tasks.push({
      //   id: new Date().getTime() + '',
      //   title: "Title",
      //   description: "Description",
      //   assignedTo: "AssignedTo"
      // });
    }
  }

  updateTask(data: ITask) {
    this.tasksService.updateTask(data);
  }

  deleteTask(id: string): void {
    this.tasksService.deleteTask(id);
  }

  exportTasks(): void {
    this.tasksService.exportTasks();
  }

  loadTasks(): void {
    this.tasksService.loadTasks();
  }

  private removeExtraTasks(size: number): void {
    this.tasksService.removeExtraTasks(size);
  }
}
