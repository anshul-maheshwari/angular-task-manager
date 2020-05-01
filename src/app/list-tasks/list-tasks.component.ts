import { Component, OnInit, Input, SimpleChanges } from "@angular/core";

import { from } from "rxjs";

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
  constructor() {}
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
    this.tasks = [];
  }

  addTask(): void {
    if (this.tasks.length < this.maxNumberOfTasks) {
      this.tasks.push({
        id: new Date().getTime() + '',
        title: "Title",
        description: "Description",
        assignedTo: "AssignedTo"
      });
    }
  }

  updateTask(data: ITask) {
    if (data && data.id) {
      const toUpdateData = (this.tasks || []).find(
        fTask => (fTask.id === data.id)
      );
      if (toUpdateData) {
        toUpdateData.title = data.title;
        toUpdateData.assignedTo = data.assignedTo;
        toUpdateData.description = data.description;
      }
    }
  }

  deleteTask(id: string): void {
    if (id) {
      this.tasks = (this.tasks || []).filter(fTask => fTask.id !== id);
    }
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
    if(size < this.tasks.length) {
    this.tasks.length = size;
    }
    // Note: Alternate
    // const toRemove = this.tasks.length - size;
    // if (toRemove > 0) {
    //   this.tasks = this.tasks.splice(size - 1, toRemove);
    // }
  }
}
